import zod from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = zod.object({
    PORT: zod.string().default("3000"),
})

const parsed = envSchema.safeParse(process.env);

if(!parsed.success){
    console.error('❌ Invalid environment configuration:', parsed.error.message);
    process.exit(1);    
}

export const config = parsed.data;