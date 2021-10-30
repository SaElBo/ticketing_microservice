import { Document, Model } from "mongoose";
// import UserRepository from "../../repository/UserRepository";

export interface TicketAttr {
  title: string;
  price: number;
}

export interface TicketDoc extends Document {
  title: string;
  price: number;
}

export interface TicketModel extends Model<TicketDoc> {}
