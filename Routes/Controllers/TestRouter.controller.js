import { validationResult } from "express-validator";
import { Test } from "../../Models/Test.js";
import jwt from 'jsonwebtoken';
import { Questions } from "../../Models/Questions.js";
import {User} from "../../Models/User.js";


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
    const tests = await Test.find().limit(8).sort({_id:-1})
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

export async function Search(req,res){
    const {textSearch} = req.body
        let searchText = textSearch.toLowerCase()
    const arraySearch = searchText.split('')
    const tests = await Test.find()
    const result=[]
    for(let i = 0;i<tests.length;i++){
        let match = 0;
        const title = tests[i].title.toLowerCase()
        for(let z = 0;z<arraySearch.length;z++){
            if(arraySearch[z] !== ' ' && title.includes(arraySearch[z])){
                match++
            }
        }
        if(match === arraySearch.length){
            match = 0;
            result.push(tests[i])
        }
        match = 0
    }
    res.json({
        result
    })
}

export async function getTest(req,res){
    const { id } = req.params;
    const test = await Test.findOne({ _id: id })
    const quests = await Questions.find({ testId: id })
    res.json({ test, quests })
}

export async function changeAnsver(req,res){
    const { testId, answers, token, score } = req.body
    const {userId} =   jwt.verify( token,process.env.secret )
    const user = await User.findById(userId)
    const test = await Test.findById( testId )
    let ansvers = test.ansvers
    let isAnsver;
    for( let i = 0; i < ansvers.length;i++ ){
        if(ansvers[i].userId === userId){
            isAnsver = {index:i}
        }
    }
    let newAnsver = { userId:userId, quests:[...answers], score, userName:user.username }
    if( isAnsver ){
        delete ansvers[isAnsver.index] 
        ansvers.splice(isAnsver.index,1)
    }
    ansvers.push( newAnsver )
    await Test.findByIdAndUpdate( testId,{ansvers} )

    res.json({
        ok:true
    })
}

export async function Top ( req,res ){
    const tests = await Test.find().sort({ansvers:-1})
    const returnTests = tests.splice(0,8)
    res.json({
        tests:returnTests
    })
}

export async function GetAnsvers( req,res ){
    const test = await Test.findById(req.body.testId)
    res.json({
        ansvers:test.ansvers
    })
}