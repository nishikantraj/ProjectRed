import { Request, Response } from "express";
import { hashPassword } from "@/utils/crypto";
import { createJwt } from "@/utils/jsonwebtoken";
import { prisma } from "@/lib/prisma";

const registerHandler = async(req:Request,res:Response)=>{
    const {userName, name, email, password} = req.body;

    
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
    const isProduction = process.env.NODE_ENV === 'production';
    console.log("Is Secure Cookie Enabled?", process.env.NODE_ENV === 'production');

    res.cookie('token', jwtToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000
    })
    
    return res.status(200).json({msg:"User created successfully"});
}

export default registerHandler;