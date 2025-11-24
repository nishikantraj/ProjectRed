import express  from "express";

export const app = express();

app.get('/',(req, res)=>{
    return res.status(200).send("Hello");
})
