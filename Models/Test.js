import mongoose from 'mongoose';
const { Schema } = mongoose;

const TestScheme  = new Schema({
    userId:String,
    title: String,
    text:String,
    ansvers:
    [
        { 
            userId: String,
            quests:Array
        }
    ]
})

export const Test =  mongoose.model('Test', TestScheme);
