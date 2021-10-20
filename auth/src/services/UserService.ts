import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsinc = promisify(scrypt);

export class UserService {
  static async passwordToHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsinc(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  static async comparePassword(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsinc(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
