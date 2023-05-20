import { Request, Response } from "express";
import pipedrive from "pipedrive";

const apiClient = new pipedrive.ApiClient();
const api = new pipedrive.DealsApi(apiClient);
let TOKENS = {};

let oauth2 = apiClient.authentications.oauth2;
oauth2.clientId = "0494d1b7cd096deb";
oauth2.clientSecret = "cf32220b35508cce863201560369ed77046a1356";
oauth2.redirectUri = "https://pipedrive-app.vercel.app/api/callback";

export default async function callback(req: Request, res: Response) {
  const code = req.query.code;
  const tokenPromise = apiClient.authorize(code);

  await tokenPromise.then((res) => (TOKENS = res));
  return res.json(TOKENS);
}
