import { Request, Response, NextFunction } from "express";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log('handling this error as request validation error');
      const errors = err.errors.map((error) => {
        return {
          message: error.msg,
          field: error.param,
        };
      });

      return res.status(400).send({ errors });
  }

  if (err instanceof DatabaseConnectionError) {
    console.log('handling this error as database connection error');
    return res.status(500).send({
      errors: [{ message: err.reason }],
    });
  }

  res.status(400).send({
    errors: [{message: 'Something went wrong'}],
  });
};