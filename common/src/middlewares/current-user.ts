import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}

// This is how we can reach into an existing type definition and make a modification to it
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    // If the user is not logged in, we don't want to throw an error
    // Instead, we just want to return null
    if (!req.session?.jwt) {
        return next();
    }

    try{
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (e) {}

    next()
}