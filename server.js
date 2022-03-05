import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import UserRoute from "./Routes/UserRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || process.env.myPort || 5000;

app.use(express.json({ extended: true }))
app.use('/api', UserRoute)

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