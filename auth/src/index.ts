import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError } from "@bousal/common";
const PORT = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
