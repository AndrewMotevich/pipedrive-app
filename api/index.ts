import fs from "node:fs/promises";
import express from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import cors from "cors";
// @ts-ignore
import pipedrive from "pipedrive";

// Constants
const port = process.env.PORT || 5173;
const apiClient = new pipedrive.ApiClient();
const api = new pipedrive.DealsApi(apiClient);
let TOKENS = {};

// Configuration parameters and credentials
let oauth2 = apiClient.authentications.oauth2;
oauth2.clientId = "0494d1b7cd096deb";
oauth2.clientSecret = "cf32220b35508cce863201560369ed77046a1356";
oauth2.redirectUri = "https://pipedrive-app.vercel.app/api/callback";

export const Cors = {
  origin: [
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:5500",
    "https://example-sandbox.pipedrive.com",
  ],
  methods: "GET,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
const jsonParser = bodyParser.json();

// Create http server
const app = express();

app.use(cors(Cors));
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

declare module "express-session" {
  export interface SessionData {
    accessToken: { [key: string]: any };
  }
}

app.get("/api", (req, res) => {
  apiClient.authentications.oauth2.accessToken = req.session.accessToken;
  if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
    return res.redirect("/");
  } else {
    const authUrl = apiClient.buildAuthorizationUrl();
    res.redirect(authUrl);
  }
});

app.get("/api/refresh", async (req, res) => {
  const refreshPromise = apiClient.refreshToken() as Promise<object>;
  await refreshPromise.then(
    (res) => {
      req.session.accessToken = apiClient.authentications.oauth2.accessToken;
      TOKENS = res;
    },
    (error) => {
      console.log(error);
    }
  );
  return res.json(TOKENS);
});

app.get("/api/callback", async (req, res) => {
  const code = req.query.code;
  const tokenPromise = apiClient.authorize(code) as Promise<object>;

  // add access token to session
  req.session.accessToken = apiClient.authentications.oauth2.accessToken;

  await tokenPromise.then((res) => (TOKENS = res));
  res.json(TOKENS);
});

app.get("/api/deals", async (req, res) => {
  if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
    const deals = await api.getDeals();

    res.send(deals);
  } else {
    const authUrl = apiClient.buildAuthorizationUrl();

    res.redirect(authUrl);
  }
});

app.get("/api/v2/deals", async (req, res) => {
  if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
    const deals = await api.getDeals();

    res.send(deals);
  } else {
    const authUrl = apiClient.buildAuthorizationUrl();

    res.redirect(authUrl);
  }
});

app.post("/api/deals", jsonParser, async (req, res) => {
  const title = req.body["firstName"];
  let opts = pipedrive.NewDeal.constructFromObject({
    title: `Job ${title}`,
  });
  console.log(opts);
  return await api.addDeal(opts).then(
    () => res.end("Deal was added"),
    () => {
      res.status(500).json({ message: "something wrong" });
    }
  );
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
