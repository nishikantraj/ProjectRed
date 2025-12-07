import { Request, Response } from "express";
import { hashPassword } from "../../utils/crypto";
import { prisma } from "../../lib/prisma";
import { createJwt } from "../../utils/jsonwebtoken";


const loginHandler = async(req:Request,res:Response)=>{
    const {email, password} = req.body;

    
    const doesUserExists = await prisma.user.findUnique({
        where:{
            email
        },
        select:{userName:true, email:true, id:true}
    });

    if(!doesUserExists){
        return res.status(409).json({msg:"User does not exist"});
    }

    const jwtToken = createJwt({id:doesUserExists.entries(u=> ), userName:userName});

    return res.status(200).json({msg:"User created", jwtToken});
}

export default loginHandler;