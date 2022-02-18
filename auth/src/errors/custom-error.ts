export default abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor() {
        super();
    }

    abstract serializeErrors(): { message: string; field?: string }[];
}