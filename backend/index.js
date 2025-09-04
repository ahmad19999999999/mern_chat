import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/bd.js";
import userRouter from "./routes/userrouter.js";

const app=express()
dotenv.config()
app.use(cors())
app.use(express.json())

app.use('/api/v1', userRouter)

const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
    connectDB();
})