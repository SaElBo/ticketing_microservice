import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler , NotFoundEror} from "@bousal/common";


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
  "/api/users/tickets-docs.json",
  express.static(__dirname + "/tickets-docs.json")
);


app.all("*", () => {
  throw NotFoundEror;
});

app.use(errorHandler);

export { app };
