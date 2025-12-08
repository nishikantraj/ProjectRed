import { NextFunction, Request, Response } from "express";
import { userLoginSchema } from "./signupValidationis";

export const signInValidation = async(req: Request, res:Response, next:NextFunction)=>{

    const {email} = req.body;
    const parsedData = userLoginSchema.safeParse({email});

    
    if(!parsedData.success){
        const error = parsedData.error.issues.map(e=>e.message)
        
        return res.status(400).json({
            success: false,
            message: error,
        });
    }

    next();
};