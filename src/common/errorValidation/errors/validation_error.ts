export abstract class ValidationError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  abstract validationSerializeErrors(): { message: string; errors?: {} }[];

}
