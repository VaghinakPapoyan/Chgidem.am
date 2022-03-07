import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserScheme = new Schema({
    username: String,
    password: String,
    email: String,
    nickname: String,
    avatar: String
})

export const User = mongoose.model('User', UserScheme);
