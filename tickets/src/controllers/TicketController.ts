import { Controller, BadRequestError } from "@bousal/common";
import { Request, Response } from "express";
import TicketRepository from "../repository/TicketRepository";
export default class TicketController extends Controller<TicketRepository> {
  constructor(repo: TicketRepository) {
    super(repo);
  }

  async new(req: Request, res: Response) {
    const { title, price } = req.body;
    const userId = req.currentUser!.id;
    const ticket = await this.model.build({ title, price, userId });
    await ticket.save();
    res.status(201).send(ticket);
  }
}
