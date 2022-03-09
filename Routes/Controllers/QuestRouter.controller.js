import { validationResult } from "express-validator"
import { Questions } from "../../Models/Questions.js"
import { newTest } from "./TestRouter.controller.js"

export async function AddQuests(req,res){
    try{      
        const test = newTest
        const {quests} = req.body
        for(let i  = 0;i<quests.length;i++){
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
export async function JoinQuest(req,res){
    try{      
        const {quests,testId} = req.body
        for(let i  = 0;i<quests.length;i++){
            await Questions.create({testId,title:quests[i].title,quest:quests[i].quest,ansvers:quests[i].ansvers,trueAnsver:quests[i].trueAnsver})
        }
        
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
    res.status(200).json({
        quests
    })
}


export async function DeleteQuest(req,res){
    const {questId} = req.body
    await Questions.findByIdAndDelete(questId)
    res.json({
        ok:true
    })
}

export async function UpdateOne(req,res){
    const {questId,title,quest,ansvers,trueAnsver} = req.body
    await Questions.findByIdAndUpdate(questId,{title,quest,ansvers,trueAnsver})
    res.status(200).json({
        ok:true
    })
}

export async function GetQuest(req,res){
    const {questId} = req.body
    const quest = await Questions.findById(questId)
    res.status(200).json({
        quest
    })
}
