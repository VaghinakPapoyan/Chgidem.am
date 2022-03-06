import { Test } from "../../Models/Test.js";

export async function Add(req,res){
    try{
        const { title } = req.body
        const newTusk =  new Test({title})
        await newTusk.save()
        return res.json({
            message: newTusk
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