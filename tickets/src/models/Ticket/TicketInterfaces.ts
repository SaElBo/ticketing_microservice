import { Document, Model } from "mongoose";
// import UserRepository from "../../repository/UserRepository";

export interface TicketAttr {
  title: string;
  price: number;
  userId: string;
}

export interface TicketDoc extends Document {
  title: string;
  price: number;
  userId: string;
}

export interface TicketModel extends Model<TicketDoc> {}
