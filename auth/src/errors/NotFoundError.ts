import { CustomError } from "./CustomError";

export class NotFoundEror extends CustomError {
  statusCode = 404;
  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundEror.prototype);
  }
  serializeErrors() {
    return [
      {
        message: "Not found",
      },
    ];
  }
}
