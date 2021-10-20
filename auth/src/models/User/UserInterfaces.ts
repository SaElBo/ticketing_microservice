import { Document , Model} from "mongoose";
// import UserRepository from "../../repository/UserRepository";

export interface UserAttr {
  email: string;
  password: string;
}

export interface UserDoc extends Document {
  email: string;
  password: string;
}

export interface UserModel extends Model<UserDoc>{

}
