import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import TicketRepository from "../../repository/TicketRepository";
const Ticket = new TicketRepository();

it("returns a 404 if the ticket is not fount", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tikcets/${id}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const ticketPayload = { title: "test", price: 10, userId: "121120dsads" };
  const ticket = await Ticket.build(ticketPayload);
  await ticket.save();
  const res = await request(app)
    .get(`/api/tickets/${ticket.id}`)
    .send()
    .expect(200);
  expect(res.body.title).toEqual(ticketPayload.title);
  expect(res.body.price).toEqual(ticketPayload.price);
});
