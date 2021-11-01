import request from "supertest";
import { app } from "../../app";
import TicketRepository from "../../repository/TicketRepository";
const Ticket = new TicketRepository();

const createTicket = async () => {
  const ticketPayload = { title: "test", price: 10, userId: "121120dsads" };
  let ticket = await Ticket.build(ticketPayload);
  await ticket.save();
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();

  const res = await request(app).get(`/api/tickets/`).send().expect(200);
  expect(res.body.length).toEqual(2);
});
