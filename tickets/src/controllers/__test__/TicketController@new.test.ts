import request from "supertest";
import { app } from "../../app";
import TicketRepository from "../../repository/TicketRepository";

const Ticket = new TicketRepository();
it("has a route handler listening to /api/tickets from post request", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).not.toEqual(404);
});
it("can only be accessed if user is signe in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});
it("return a status other than 401 if user is signe in ", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(res.status).not.toEqual(401);
});
it("return an error if inavalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 })
    .expect(400);
});
it("return an error if inavalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", price: -10 })
    .expect(400);
});
it("creates a ticket with valid inputs", async () => {
  //add check to create ticket

  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", price: 10 })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
