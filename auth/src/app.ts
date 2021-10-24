import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundEror } from "./errors/NotFoundError";
import { api } from "./routes/api";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(
  "/api/users/auth-docs.json",
  express.static(__dirname + "/auth-docs.json")
);
app.use(api);

app.all("*", () => {
  throw NotFoundEror;
});

app.use(errorHandler);

export { app };
