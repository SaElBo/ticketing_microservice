import express, { Request, Response } from "express";
import { body } from "express-validator";
const router = express.Router();
import UserController from "../controllers/UserController";
import UserRepository from "../repository/UserRepository";
import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
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
  validateRequest,
  (req: Request, res: Response) => controller.signUp(req, res)
);
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  (req: Request, res: Response) => controller.signIn(req, res)
);
router.get("/api/users/currentuser", currentUser,(req: Request, res: Response) =>
  controller.currentUser(req, res)
);

router.post("/api/users/signout", (req: Request, res: Response) =>
  controller.signOut(req, res)
);

export { router as api };
