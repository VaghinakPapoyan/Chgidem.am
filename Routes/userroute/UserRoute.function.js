import { validationResult } from "express-validator";
import User from "../../Models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export async function register(req,res){
  try{
    const { name, password } = req.body
    //validation
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ error: errors.array() });
    }

    //search data
    const data = await User.findOne({name})
    if( data ){
        return res.status(200).json( { error:'this name already taken' } )
    }

    //create user
    const HashPassword = await bcrypt.hash( password, 7 )
    await User.create( { name,password:HashPassword } )
    return res.status(200).json( { message:'user was created' } )
  }catch(e){
      return res.json( { error:e} )
  }
}

export async function login(req,res){
    try{
        const {name,password} = req.body
        //validation
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(200).json({ error: errors.array() });
        }
        //find user
        const data = await User.findOne({name})
        if( !data ){
            return res.status(200).json({
                error:"user not found"
            })
        }
        //check password
        const hash = data.password;
        const CheckPassword =await  bcrypt.compare( password,hash )
        if( !CheckPassword ){
            return res.status(200).json({
                error:"user not found"
            })
        }

        //create token
        const token = await jwt.sign( { userId:data._id},process.env.secret,{  expiresIn: '10m', } )
        return res.status(200).json({
            token
        })
    }catch(e){
        return res.json({error:e})
    }
}