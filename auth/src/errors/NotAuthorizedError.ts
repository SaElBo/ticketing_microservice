import { CustomError } from "./CustomError";

export class NotAutorizerError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not authorized");
    // da fare solo se si estende una classe del linguaggio
    Object.setPrototypeOf(this, NotAutorizerError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: "Not authorized",
      },
    ];
  }
}
