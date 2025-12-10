import express  from "express";
import userRouter from './modules/user/user.routes'
import cookieParser from "cookie-parser";

export const app = express();


app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
