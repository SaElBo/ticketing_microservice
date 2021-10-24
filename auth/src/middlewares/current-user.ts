import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = UserService.validateJWT(req.session?.jwt);
    req.currentUser = payload;
  } catch (_) {
    
  }

  next();
};
