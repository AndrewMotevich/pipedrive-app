import { Request, Response } from "express";
import pipedrive from "pipedrive";

const apiClient = new pipedrive.ApiClient();
const api = new pipedrive.DealsApi(apiClient);
let TOKENS = {};

export default async function callback(req: Request, res: Response) {
  const code = req.query.code;
  const tokenPromise = apiClient.authorize(code);

  tokenPromise.then((res) => (TOKENS = res));
  return res.json(TOKENS);
}
