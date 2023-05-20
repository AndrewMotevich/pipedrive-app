import { Request, Response } from "express";

const handler = (req: Request, res: Response) => {
  res.end("hello world");
};
