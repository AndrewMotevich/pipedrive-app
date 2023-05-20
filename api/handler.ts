import { Request, Response } from "express";

export default async function handler(request: Request, response: Response) {
  response.setHeader("Set-Cookie", "querty=12345678");
  return response.json({
    success: true,
  });
}
