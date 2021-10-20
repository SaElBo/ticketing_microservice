import express, {Request,Response} from "express";
import { body } from "express-validator";
const router = express.Router();
import UserController from "../controllers/UserController";
// router.get("/api/users/currentuser", UserController.currentUser());
import UserRepository from "../repository/UserRepository";
const controller = new UserController(new UserRepository());
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Invalid password"),
  ],
  (req: Request, res: Response) =>  controller.signUp(req, res)
);
router.get("/api/users/test", UserController.test);

export { router as api };
