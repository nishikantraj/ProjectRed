import { compare, genSalt, hash} from "bcrypt-ts";

export const hashPassword = async(password:string):Promise<string>=>{
    const salt = await genSalt(10);
    const result = await hash(password, salt);

    return result;
};

export const dehashPassword = async(password:string, hashedPassword:string):Promise<Boolean> =>{
    const isPasswordCorrect = await compare(password, hashedPassword);

    return isPasswordCorrect;
}
