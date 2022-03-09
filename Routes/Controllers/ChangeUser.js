import { User } from "../../Models/User.js";
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import fs from "fs"
import path from "path"
import cloudinary from "../../Moduls/cloudinary.js";

export async function ChangeUser(req,res){
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ error: errors.array()[0].msg });
        }

        const { username, nickname, token } = req.body

        const userid = await jwt.verify(token, process.env.secret)

        const thisUser = await User.findOne({ _id: userid.userId })

        //search data
        let data = await User.findOne({ username })

        if( data && thisUser.username !== username ){
            return res.status(200).json( { error:'This name already taken' } )
        }

        await User.updateOne({ _id: userid.userId }, { $set: { username, nickname } })

        return res.status(200).json( { ok: true, message: 'Data updated.' } )
    }
    catch(e)
    {
        return res.json( { error:e } )
    }
}

export async function ChangeUserImage(req,res){
    try
    {
        if(req.file)
        {
            const result = await cloudinary.uploader.upload(req.file.path)
            const { token } = req.body;
            const userid = await jwt.verify(token, process.env.secret)
            await User.updateOne({ _id: userid.userId }, { $set: { avatar: result.url }})
            return res.json({ path: result.url, message: 'Image updated.' })
        }

        return res.status(200).json( { ok: true, message: 'Image is not updated.' } )
    }
    catch(e)
    {
        return res.json( { error:e } )
    }
}