import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";
import { RequestValidationError } from "../errors/RequestValidationError";
const router = express.Router();
/**
 * It takes email and password validate then and create e new user
 */
router.get(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Invalid password"),
  ],
 
);

export { router as signupRouter };
