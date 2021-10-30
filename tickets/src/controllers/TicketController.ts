import { Controller, BadRequestError } from "@bousal/common";
import { Request, Response } from "express";
import TicketRepository from "../repository/TicketRepository";
export default class TicketController extends Controller<TicketRepository> {
  constructor(repo: TicketRepository) {
    super(repo);
  }

  async new(req: Request, res: Response) {
    res.send(200);
  }
}
