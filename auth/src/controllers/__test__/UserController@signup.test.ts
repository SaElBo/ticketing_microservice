import request from "supertest";
import { app } from "../../app";
import { BadRequestError } from "@bousal/common";

//SIGNUP
it("return a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("return 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "password",
    })
    .expect(400);
});

it("return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "p",
    })
    .expect(400);
});

it("return a 400 with missing email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "p",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "password",
    })
    .expect(400);
});

it("return a BadRequestError with wrong password", async () => {
  try {
    request(app).post("/api/users/signup").send({
      email: "test@test.com",
      password: "p",
    });
  } catch (e) {
    expect(e).toBeInstanceOf(BadRequestError);
  }
});

it("return a BadRequestError with wrong email", async () => {
  try {
    request(app).post("/api/users/signup").send({
      email: "test",
      password: "password",
    });
  } catch (e) {
    expect(e).toBeInstanceOf(BadRequestError);
  }
});

it("return a user on successfull signup", async () => {
  const res = await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "password",
  });
  expect(res.body.email).toBeDefined();
  expect(res.body.id).toBeDefined();
});

it("sets a cookie after succesfull signup", async () => {
  const res = await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "password",
  });
  expect(res.get("Set-Cookie")).toBeDefined();
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

