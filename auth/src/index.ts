import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

// import { currentUserRouter } from "./routes/current-user";
// import { signinRouter } from "./routes/signin";
// import { signoutRouter } from "./routes/signout";
// import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundEror } from "./errors/NotFoundError";
import { DatabaseConnectionError } from "./errors/DatabaseConnectionError";
import { api } from "./routes/api";
const PORT = 3000;
const app = express();

app.use(json());

app.use(api);
// app.use(currentUserRouter);
// app.use(signoutRouter);
// app.use(signupRouter);

app.all("*", () => {
  throw NotFoundEror;
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log("connected");
  } catch (_) {
    throw new DatabaseConnectionError();
  }
  app.listen(PORT, () => {
    console.log(`App su porta: ${PORT}`);
  });
};

start();
