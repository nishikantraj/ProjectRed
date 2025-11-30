import express  from "express";
import userRouter from './modules/user/user.routes'

export const app = express();


app.use(express.json());


app.use('/api/v1/user', userRouter);
