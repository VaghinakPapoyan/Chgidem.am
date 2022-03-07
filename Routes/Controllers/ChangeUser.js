import { User } from "../../Models/User.js";
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";

export async function ChangeUser(req,res){
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ error: errors.array()[0].msg });
        }

        const { username, nickname, token } = req.body

        const userid = jwt.verify(token, process.env.secret)

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