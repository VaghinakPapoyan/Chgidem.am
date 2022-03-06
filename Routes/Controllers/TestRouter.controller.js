import { validationResult } from "express-validator";
import { Test } from "../../Models/Test.js";

export let newTest = {}
export async function Add(req,res){
    try{
        const { title,about } = req.body
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ error: errors.array()[0].msg });
        }

        newTest =  new Test({title,text:about})
        newTest.save()
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