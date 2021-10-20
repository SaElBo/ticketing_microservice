import { Document } from "mongoose";
export default abstract class Repository<T, U extends Document> {
  abstract build(model: T): U;
}
