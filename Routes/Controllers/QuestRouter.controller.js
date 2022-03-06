import { validationResult } from "express-validator"
import { Questions } from "../../Models/Questions.js"
import { newTest } from "./TestRouter.controller.js"

export async function AddQuests(req,res){
    try{
      
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ error: errors.array()[0].msg });
        }
        const test = newTest
        test.save()
        const {title,quest,ansvers,trueAnsver} = req.body
        const Quest = new Questions({testId:test._id,title,quest,ansvers,trueAnsver})

        await Quest.save()
        
        return res.json({
            message:'true'
        })

    }catch(e){
        return res.json({
            error:e
        })
    }
}

export async function GetQuests(req,res){
    const {testId} = req.body
    const quests = await Questions.find({testId})
    res.statue(200).json({
        quests
    })
}