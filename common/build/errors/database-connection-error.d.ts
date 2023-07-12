import { CustomError } from "./custom-error";
export declare class DatabaseConnectionError extends CustomError {
    statusCode: number;
    reason: string;
    constructor();
    serialiseErrors(): {
        message: string;
    }[];
}
