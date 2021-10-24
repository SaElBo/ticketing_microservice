import { Document } from "mongoose";
import Repository from "../../../common/src/repository/Repository";
import { User } from "../models/User/User";
import { FilterQuery } from "mongoose";
import { UserAttr, UserDoc, UserModel } from "../models/User/UserInterfaces";
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
