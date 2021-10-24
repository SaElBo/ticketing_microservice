import {Repository} from "@bousal/common";
import { User } from "../models/User/User";
import { FilterQuery } from "mongoose";
import { UserAttr, UserDoc } from "../models/User/UserInterfaces";
export default class UserRepository extends Repository<UserAttr, UserDoc> {
  build(user: UserAttr) {
    return new User(user);
  }
  async save(user: UserAttr) {
    return await this.build(user).save();
  }
  async find(filter: FilterQuery<UserDoc>) {
    const user = await User.find(filter)
    return user.length > 0 ? user : null;
  }
}
