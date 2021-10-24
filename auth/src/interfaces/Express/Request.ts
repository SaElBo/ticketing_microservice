import { UserPayload } from "@bousal/common";
declare global {
    namespace Express {
        interface Request {
            currentUser? : UserPayload
        }
    }
}