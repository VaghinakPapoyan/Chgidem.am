import mongoose from 'mongoose';
const { Schema } = mongoose;

const TestScheme  = new Schema({
    title: String,
    ansvers:[
        {userId:String,score:String}
    ]
})

export const Test =  mongoose.model('Test', TestScheme);
