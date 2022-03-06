import {Test} from "../../Models/Test.js";

export async function Add(req,res){
    try{
        const {title} = req.body
        const newTusk =  new Test({title})
        await newTusk.save()
        return res.json({
            message:newTusk
        })
    }catch(e){
        res.json({
            error:e
        })
    }
}