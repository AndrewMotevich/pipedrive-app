import { Request, Response } from "express";

export default async function handler(request: Request, response: Response) {
  return response.json({
    success: true,
  });
}
