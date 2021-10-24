import UserRepository from "../repository/UserRepository";
import Controller from "./Controller";
import { Request, Response } from "express";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User/User";
import { UserService } from "../services/UserService";


export default class UserController extends Controller<UserRepository> {
  constructor(repo: UserRepository) {
    super(repo);
  }

  async signUp(req: Request, res: Response) {
    const { email, password } = req.body;

    const existingUser = await this.model.find({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }
    const user = await this.model.build({ email, password });
    await user.save();

    //generate jwt
    const userJwt = UserService.generateJWT(user);
    //store on cookie
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await UserService.comparePassword(
      user.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    const userJwt = UserService.generateJWT(user);
    //store on cookie
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(user);
  }
  currentUser(req: Request, res: Response) {
    res.send({ currentUser: req.currentUser || null});
  }
  signOut(req: Request, res: Response) {
    req.session = null;
    res.send({});
  }
}
