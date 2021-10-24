import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError } from "./errors/DatabaseConnectionError";
const PORT = 3000;



const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
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
