import { Request, Response, NextFunction } from "express";
import { NotAutorizerError } from "../errors/NotAuthorizedError";

export const requireAuth = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAutorizerError();
  }
  next();
};
