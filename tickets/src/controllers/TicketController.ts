import { Controller, NotFoundEror } from "@bousal/common";
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

  async show(req: Request, res: Response) {
    const ticket = await this.model.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundEror();
    }
    res.send(ticket);
  }
  async index(req: Request, res: Response) {
    const tickets = await this.model.all();

    res.send(tickets);
  }
}
