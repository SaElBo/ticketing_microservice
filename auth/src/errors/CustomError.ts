export abstract class CustomError extends Error{
  abstract statusCode: number;
  constructor(message : string) {
    super(message);

    // da fare solo se si estende una classe del linguaggio
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
