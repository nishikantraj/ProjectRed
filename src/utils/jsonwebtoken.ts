import jwt from 'jsonwebtoken';

interface tokenPayload  {
    id: number;
    userName: string;
}

export const createJwt = (userPayLoad:tokenPayload):string=>{
    const jwtToken = jwt.sign(userPayLoad, process.env.JWT_SECRET as string)
    return jwtToken
}


