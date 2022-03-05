import { Router } from "express";
import { check } from "express-validator";
import { login, registration, dataCheck, getUser } from "./Controllers/UserRoute.controller.js";

const UserRoute = Router()

UserRoute.post(
    '/dataCheck',
    [
        check('email','Email is incorrect').isEmail(),
        check('username','minimum length of name was 8').isLength(8),
        check('password','minimum length of password was 8').isLength(8)
    ],
    dataCheck
)

UserRoute.post(
    '/registration',
    registration
)

UserRoute.post(
    '/login',
    [
        check('email','Email is incorrect').isEmail(),
        check('password','minimum length of password was 8').isLength(8)
    ],
    login
)

UserRoute.get('/getUser/:token',getUser )
export default UserRoute