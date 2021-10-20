import { model, Schema } from "mongoose";
import { UserDoc, UserModel } from "./UserInterfaces";
import { UserService } from "../../services/UserService";

const userSchema = new Schema<UserDoc, UserModel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await UserService.passwordToHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
