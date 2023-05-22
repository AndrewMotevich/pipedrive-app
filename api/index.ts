import express from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import cors from "cors";
// @ts-ignore
import pipedrive from "pipedrive";

// Constants
const Cors = {
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
const port = process.env.PORT || 5173;
const apiClient = new pipedrive.ApiClient();
const api = new pipedrive.DealsApi(apiClient);
const apiPerson = new pipedrive.PersonsApi(apiClient);
const jsonParser = bodyParser.json();
let TOKENS = {};

// Configuration parameters and credentials
let oauth2 = apiClient.authentications.oauth2;
oauth2.clientId = "0494d1b7cd096deb";
oauth2.clientSecret = "cf32220b35508cce863201560369ed77046a1356";
oauth2.redirectUri = "https://pipedrive-app.vercel.app/api/callback";

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
  let person = pipedrive.NewPerson.constructFromObject({
    name: `${req.body.firstName} ${req.body.lastName}`,
    phone: req.body.tel,
    email: req.body.email,
  });
  let details = {
    title: `Job ${new Date().toDateString()}`,
    "8aca43e96e0e0f529d5fdff8e68a5f65b465c13a": req.body.jobType,
    "8ce27142967e13865f1ef032a5f6655d45c8ea10": req.body.jobSource,
    "719eea2bc017593ec818583ef0b1fba77f49cee2": req.body.jobDescription,
    d71c6545fe0dd5d6570fff4bf9182e9ce230d5b8: req.body.address,
    aae9ff04fcf089726b972d0345b3c8431250701b: req.body.city,
    "2933b080c9a7c9ed2f37967d50988da031cc9f49": req.body.state,
    "7abb387c024019b327a394c985d9f8262fdf8f7b": req.body.area,
    "81ca8ad4c48436a7ad024949a4c252b16cc6b01b": req.body.startDate,
    "001475dd726aa494db1c698fd97a1a23ce8e7355": req.body.startTime,
    "305a5f76b69a170b4eb185ffc68d9b2e80e0170b": req.body.endTime,
    ec84fcdb2fbb691bf9a12bf0f47004e55c46debf: req.body.testSelect,
    a410d5e410a890bc06410f91d1efa36477139ca7: req.body.zipCode,
    personId: 7,
  };
  await apiPerson.addPerson(person).then(
    async (data: any) => {
      details.personId = data.data.id;
      await api.addDeal(details).then(
        () => {
          res.json({ message: "Deal was added", data: data.data.id });
        },
        () => {
          res.status(500).json({ message: "something wrong" });
        }
      );
    },
    (err: Error) => {
      console.error("Error: failed to add person", err.message);
    }
  );
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
