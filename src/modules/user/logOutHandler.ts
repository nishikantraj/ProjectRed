import { Request, Response } from 'express';

export const logOutHandler = (req:Request, res:Response)=>{   
    const isSecure = process.env.NODE_ENV === 'production';

    res.cookie('token', '', {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'lax',
        maxAge: 0
    });

    return res.status(200).json({ msg: "Logged out successfully" });
}