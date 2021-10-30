import express, { Request, Response } from "express";
const router = express.Router();
import TicketController from "../controllers/TicketController";
import TicketRepository from "../repository/TicketRepository";
const controller = new TicketController(new TicketRepository());
router.post(
  "/api/tickets",

  (req: Request, res: Response) => controller.new(req, res)
);

export { router as api };
