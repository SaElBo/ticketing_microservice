import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserDoc } from "../models/User/UserInterfaces";
import { UserPayload } from "@bousal/common";
const scryptAsinc = promisify(scrypt);

export class UserService {
  static async passwordToHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsinc(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsinc(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }

  static generateJWT(user: UserDoc) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
  }
  static validateJWT(token: string): UserPayload {
    return jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
  }
}
