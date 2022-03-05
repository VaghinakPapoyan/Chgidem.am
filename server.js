import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const app = express();
const port = process.env.PORT || process.env.myPort || 5000;

async function server()
{
    try
    {
        await mongoose.connect(process.env.mongoDB)
        app.listen(port, () => { console.log("Server has been started in port: " + port); })
    }
    catch(e)
    {
        console.log(e);
    }
}
server()