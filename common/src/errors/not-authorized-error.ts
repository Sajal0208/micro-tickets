import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super("Not authorised");

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serialiseErrors() {
        return [{ message: "Not authorised" }]
    }
}
