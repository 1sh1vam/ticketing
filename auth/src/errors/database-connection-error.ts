export class DatabaseConnectionError extends Error {
    statusCode = 500;
    reason = 'Error connecting to the database'

    constructor() {
        super();
    }

    serializeErrors() {
        return {
            message: this.reason
        }
    }
}