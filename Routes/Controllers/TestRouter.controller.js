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
    const {localtoken} = req.body
    const {userId} =  jwt.verify(localtoken,process.env.secret)
    const result  = await Test.find({userId})
    return res.json(result)
}

export async function DeleteTest(req,res){
    const {testId} = req.body
    await Test.findByIdAndDelete(testId)
    res.json({
        ok:true
    })
}

export async function NumberTests(req,res){
    const tests = await Test.find()
    const number = Math.ceil(tests.length/8)
    const length = []
    for(let i = 0;i<number;i++){
        length.push(i+1)
    }
    res.json({
        length
    })
}

export async function Start(req,res){
    const tests = await Test.find().limit(8)
    res.json({
        tests
    })
}

export async function GetChecked(req,res){
    const {e} = req.body;
    const data = await Test.find().limit(e*8)
    const number = e-1
    const tests = data.slice(number*8)
    res.json({
        tests
    })
}