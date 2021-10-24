import { UserPayload } from "../UserPayload";
declare global {
    namespace Express {
        interface Request {
            currentUser? : UserPayload
        }
    }
}