import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        // Sending the error message to the super class and having the default behaviour
        // to log the error message
        super('Invalid request parameters');
    }

    serializeErrors() {
        return this.errors.map((err) => ({
            message: err.msg,
            field: err.param,
        }))
    }
}