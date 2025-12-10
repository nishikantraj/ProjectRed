import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";

export const profileHandler = async(req: Request, res: Response)=>{
    const user = req.user;

    const userData = await prisma.user.findUnique({
        where:{
            id: user?.id
        },
        select:{id:true,name:true,userName:true,email:true}
    });
    // console.log(userData);
    const data = userData;
    return res.status(200).json({data});
}