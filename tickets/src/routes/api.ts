import express, { Request, Response } from "express";
const router = express.Router();
import TicketController from "../controllers/TicketController";
import TicketRepository from "../repository/TicketRepository";
import { validateRequest, requireAuth } from "@bousal/common";
import { body } from "express-validator";

const controller = new TicketController(new TicketRepository());
router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .not()
      .isEmpty()
      .withMessage("Price is required, and must be greate than 0"),
  ],
  validateRequest,
  (req: Request, res: Response) => controller.new(req, res)
);

router.get("/api/tickets/:id", (req: Request, res: Response) =>
  controller.show(req, res)
);

export { router as api };
