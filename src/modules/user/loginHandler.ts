import { Request, Response } from "express";
import { createJwt } from "@/utils/jsonwebtoken";
import { dehashPassword } from "@/utils/crypto";
import { prisma } from "@/lib/prisma";


const loginHandler = async(req:Request,res:Response)=>{
    const {email, password} = req.body;

    
    const doesUserExists = await prisma.user.findUnique({
        where:{
            email
        },
        select:{id:true, userName:true, password:true}
    });

    if(!doesUserExists){
        return res.status(409).json({msg:"User does not exist"});
    }

    if(! await dehashPassword(password, doesUserExists.password)){
        return res.status(409).json({msg:"Wrong password"});
    }

    const jwtToken = createJwt({id:doesUserExists.id, userName:doesUserExists.userName});
    const isProduction = process.env.NODE_ENV === 'production';
    console.log("Is Secure Cookie Enabled?", process.env.NODE_ENV === 'production');

    res.cookie('token', jwtToken, {
        httpOnly:true,
        secure:isProduction,
        sameSite:"lax",
        maxAge: 60 * 60 * 1000
    });
    
    return res.status(200).json({msg:"User logged in successfully"});
}

export default loginHandler;