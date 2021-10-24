import jwt, { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  email: string;
  id: string;
}
