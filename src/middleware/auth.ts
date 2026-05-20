import { Request, Response, NextFunction } from "express";
import { findUserById } from "../service/user.service";

export const requireAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authentication token required" });
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
    return res.status(401).json({ error: "Invalid Authentication token" });
  }
}

export const requireAuthorization = async (req:Request, res:Response, next: NextFunction) => {
  try {
    const token = (req as any).body.userID
    const user = await findUserById(token)
    if (!token || !user) {
      return res.status(401).json({ error: "Authentication token not found." })
    }
    if(!user.admin){
      return res.status(403).json({error: "You do not have permission for this command."})
    }
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({error:"Error authorizing request."})
  }
}