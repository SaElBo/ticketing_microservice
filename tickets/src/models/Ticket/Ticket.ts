import { model, Schema } from "mongoose";
import { TicketDoc, TicketModel } from "./TicketInterfaces";

const ticketSchema = new Schema<TicketDoc, TicketModel>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

const Ticket = model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
