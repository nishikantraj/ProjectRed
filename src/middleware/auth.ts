import { tokenPayload, verifyJWT } from "@/utils/jsonwebtoken"
import { NextFunction, Request, Response } from "express"

declare global{
    namespace Express{
        interface Request{
            user?:tokenPayload
        }
    }
}

export const authMiddleware = (req: Request, res:Response, next:NextFunction)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    try {
        const decoded = verifyJWT(token) as tokenPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
}