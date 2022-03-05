import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./Controllers/UserRoute.controller.js";

const UserRoute = Router()

UserRoute.post(
    '/register',
    [
        check('email','Email is incorrect').isEmail(),
        check('username','minimum length of name was 8').isLength(8),
        check('password','minimum length of password was 8').isLength(8)
    ],
    register
    )

UserRoute.post(
    '/login',
    [
        check('email','Email is incorrect').isEmail(),
        check('password','minimum length of password was 8').isLength(8)
    ],
    login
)

export default UserRoute