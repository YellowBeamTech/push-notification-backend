import { Request, Response, NextFunction } from 'express';
import { Err } from './errors';
import { ValidationError } from './errors/validation_error';

export const errorHandler = (err: Err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).send({ errors: err.validationSerializeErrors() });
  }

  console.error('err', typeof err.data);
  res.status(400).send({
    errors: [{ message: err.message ? err.message :'Something went wrong',errors: err.data ? err.data : {} }],
  });
};
