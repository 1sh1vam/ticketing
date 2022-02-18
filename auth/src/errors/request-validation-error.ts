import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super();
    }

    serializeErrors() {
        return this.errors.map((err) => ({
            messge: err.msg,
            field: err.param,
        }))
    }
}