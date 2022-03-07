import { validationResult } from "express-validator"
import { Questions } from "../../Models/Questions.js"
import { newTest } from "./TestRouter.controller.js"

export async function AddQuests(req,res){
    try{      
        const test = newTest
        console.log(test)
        const {quests} = req.body
        for(let i  = 0;i<quests.length;i++){
            console.log(quests[i])
            await Questions.create({testId:test._id,title:quests[i].title,quest:quests[i].quest,ansvers:quests[i].ansvers,trueAnsver:quests[i].trueAnsver})
        }
        await test.save()
        
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