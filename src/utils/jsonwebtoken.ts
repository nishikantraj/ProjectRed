import jwt from 'jsonwebtoken';

export interface tokenPayload  {
    id: number;
    userName: string;
}

export const createJwt = (userPayLoad:tokenPayload):string=>{
    const jwtToken = jwt.sign(userPayLoad, process.env.JWT_SECRET as string, {expiresIn: '1h'})
    return jwtToken
}

export const verifyJWT = (token:string)=>{
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as  tokenPayload;
    return decoded;
}
