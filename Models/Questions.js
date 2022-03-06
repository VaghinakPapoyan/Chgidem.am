import mongoose from 'mongoose';
const { Schema } = mongoose;

const QuestionsScheme  = new Schema({
    AskId:String,
    title:String,
    quest:String,
    ansvers:Array,
    trueAnsver:String
})

export const Questions =  mongoose.model('Questions', QuestionsScheme);
