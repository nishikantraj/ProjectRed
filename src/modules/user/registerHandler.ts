import { Request, Response } from "express";
import { hashPassword } from "../../utils/crypto";
import { prisma } from "../../lib/prisma";
import { userSchema } from "../../config/zodValidation";
import { createJwt } from "../../utils/jsonwebtoken";


const registerHandler = async(req:Request,res:Response)=>{
    const {userName, name, email, password} = req.body;
    
    const parsedData = userSchema.safeParse({name, userName, email,password});

    
    if(!parsedData.success){
        const error = parsedData.error.issues.map(e=>e.message)
        
        return res.status(400).json({
            success: false,
            message: error,
        });
    }

    
    const doesUserExists = await prisma.user.findMany({
        where:{
            OR:[{userName},{email}],
        },
        select:{userName:true, email:true}
    });

    const userCheck = {
        userNameExist: doesUserExists.some((u)=> u.userName === userName),
        emailExists: doesUserExists.some(u=> u.email === email)
    };

    if(userCheck.emailExists){
        return res.status(409).json({error:"conflict", message:"Email already exists"});
    }
    else if(userCheck.userNameExist){
        return res.status(409).json({error:"conflict", message:"Username already taken"});
    }

    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
        data:{
            name,
            userName,
            email,
            password:hashedPassword
        }
    });

    const jwtToken = createJwt({id:user.id, userName:userName});

    return res.status(200).json({msg:"User created", jwtToken});
}

export default registerHandler;