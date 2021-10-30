import { Repository } from "@bousal/common";
import { Ticket } from "../models/Ticket/Ticket";
import { FilterQuery } from "mongoose";
import { TicketAttr, TicketDoc } from "../models/Ticket/TicketInterfaces";
export default class TicketRepository extends Repository<
  TicketAttr,
  TicketDoc
> {
  build(ticket: TicketAttr) {
    return new Ticket(ticket);
  }
  async save(ticket: TicketAttr) {
    return await this.build(ticket).save();
  }
  async find(filter: FilterQuery<TicketDoc>) {
    const ticket = await Ticket.find(filter);
    return ticket.length > 0 ? ticket : null;
  }
}