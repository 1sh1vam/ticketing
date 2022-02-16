import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
      const errors = err.errors.map((error) => {
          console.log('handling this error as request validation error');
          return {
              message: error.msg,
              field: error.location,
          }
      });

      res.status(400).send({ errors });
  }

  res.status(400).send({
    message: 'Something went wrong',
  });
};