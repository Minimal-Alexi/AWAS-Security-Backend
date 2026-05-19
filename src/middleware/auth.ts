import { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const _id  = token;
    if(!req.body){
      req.body = {};
    }
    (req as any).body.userID = _id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid authorization token" });
  }
}