export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string);
    abstract serialiseErrors(): {
        message: string;
        field?: string;
    }[];
}
