import fs from "node:fs/promises";
import express from "express";
import { error } from "node:console";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import { redirect } from "react-router-dom";
import pipedrive from "pipedrive";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const apiClient = new pipedrive.ApiClient();
const api = new pipedrive.DealsApi(apiClient);
let TOKENS = {};

// Configuration parameters and credentials
let oauth2 = apiClient.authentications.oauth2;
oauth2.clientId = "0494d1b7cd096deb";
oauth2.clientSecret = "cf32220b35508cce863201560369ed77046a1356";
oauth2.redirectUri = "https://pipedrive-app.vercel.app/callback";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();

app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

app.get("/", (req, res) => {
  apiClient.authentications.oauth2.accessToken = req.session.accessToken;
  if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
    return res.redirect("/main");
  } else {
    const authUrl = apiClient.buildAuthorizationUrl();
    res.redirect(authUrl);
  }
});

app.get("/deals", async (req, res) => {
  if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
    const deals = await api.getDeals();

    res.send(deals);
  } else {
    const authUrl = apiClient.buildAuthorizationUrl();

    res.redirect(authUrl);
  }
});

app.get("/callback", (req, res) => {
  const code = req.query.code;
  const tokenPromise = apiClient.authorize(code);

  // add access token to session
  req.session.accessToken = apiClient.authentications.oauth2.accessToken;

  tokenPromise.then((res) => (TOKENS = res));
  res.redirect("/");
});

app.get("/refresh", (req, res) => {
  const refreshPromise = apiClient.refreshToken();
  refreshPromise.then(
    (res) => {
      TOKENS = res;
    },
    (error) => {
      console.log(error);
    }
  );
  return res.json(TOKENS);
});

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
