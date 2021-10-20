import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError
{
  statusCode = 500;
  private _reason = "Error connecting to database";
  constructor() {
    super("Error connecting to database");

    // da fare solo se si estende una classe del linguaggio
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: this._reason,
      },
    ];
  }
}
