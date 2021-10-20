import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError
{
  statusCode = 400;
  private _reason = "Error connecting to database";
  constructor(public message : string) {
    super(message);

    // da fare solo se si estende una classe del linguaggio
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
