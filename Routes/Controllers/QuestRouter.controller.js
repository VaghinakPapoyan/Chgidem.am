import { Questions } from "../../Models/Questions.js"

export async function AddQuests(req,res){
    try{
        const {testId,title,quest,ansvers,trueAnsver} = req.body

        const Quest = new Questions({testId:testId,title,quest,ansvers,trueAnsver})

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
    res.json({
        quests
    })
}