import { Request, Response } from "express";
import { hashPassword } from "../../utils/crypto";
import { prisma } from "../../lib/prisma";


const registerHandler = async(req:Request,res:Response)=>{
    const {userName, name, email, password} = req.body;

    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
        data:{
            name,
            userName,
            email,
            password:hashedPassword
        }
    });

    return res.status(200).json(user);
}

export default registerHandler;