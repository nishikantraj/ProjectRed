import { z } from "zod";
import { Request, Response, NextFunction } from "express";


const userRegisterSchema = z.object({
  name: z.string().trim().min(3, "Name length must be greater than 3"),
  userName: z.string().trim().min(3, "UserName length must be greater than 3"),
  email: z.email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export const userLoginSchema = userRegisterSchema.pick({email:true,password:true})

export const signupValidation = async(req: Request, res:Response, next:NextFunction)=>{

    const {name, userName, email,password} = req.body;
    const parsedData = userRegisterSchema.safeParse({name, userName, email,password});

    
    if(!parsedData.success){
        const error = parsedData.error.issues.map(e=>e.message)
        
        return res.status(400).json({
            success: false,
            message: error,
        });
    }

    next();
};
