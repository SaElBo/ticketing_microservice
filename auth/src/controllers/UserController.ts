import UserRepository from "../repository/UserRepository";
import Controller from "./Controller";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";
import { RequestValidationError } from "../errors/RequestValidationError";
import { BadRequestError } from "../errors/BadRequestError";
export default class UserController extends Controller<UserRepository> {
  constructor(repo: UserRepository) {
    super(repo);
  }
  
  async signUp(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const existingUser = await this.model.find({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }
    const user = await this.model.build({ email, password });
    user.save();
    res.status(201).send(user);
  }
  static test(req: Request, res: Response) {
    res.send("ok funziona");
  }
}
