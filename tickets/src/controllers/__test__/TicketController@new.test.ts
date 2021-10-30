import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets from post request", async () => {
   const res =  await request(app).post('/api/tickets').send({})
   console.log(res.status);
   expect(res.status).not.toEqual(404);
});
it("can only be accessed if user is signe in", async () => {});
it("return an error if inavalid title is provided", async () => {});
it("return an error if inavalid price is provided", async () => {});
it("creates a ticket with valid inputs", async () => {});
