import { validationResult } from "express-validator";
import { Test } from "../../Models/Test.js";
import jwt from 'jsonwebtoken';


export let newTest = {}
export async function Add(req,res){
    try{
        const { title,about,token } = req.body
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ error: errors.array()[0].msg });
        }

        const id =   jwt.verify(token,process.env.secret)
        newTest =  new Test({userId:id.userId,title,text:about})
        return res.json({
            message: newTest._id
        })

    }catch(e){
        res.json({
            error:e
        })
    }
}

export async function GetAll(req,res){
    try {
        const TestArray = await Test.find()
        res.json({
            TestArray
        })
    } catch(e) {
        res.json({
            error:e
        })
    }
}


export async function GetTest(req,res){
    console.log(req.body)
    const {localtoken} = req.body
    const {userId} =  jwt.verify(localtoken,process.env.secret)
    const result  = await Test.find({userId})
    return res.json(result)
}