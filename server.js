import express from "express";
import mongoose from "mongoose";

const app = express();

async function server()
{
    try
    {
        app.listen(3000, () => { console.log("serser has been started"); })
    }
    catch(e)
    {
        console.log(e);
    }
}
server()