import mongoose from 'mongoose';
const { Schema } = mongoose;

const User = new Schema({
    name:String,
    password:String
})

export default mongoose.model('User',User)