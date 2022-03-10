import { Router } from "express";
import { check } from "express-validator";
import { login, registration, dataCheck, getUser, forgetPassword, changePassword, goToChange } from "./Controllers/UserRoute.controller.js";

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
UserRoute.post(
    '/forget-password',
    [
        check('email','Email is incorrect').isEmail(),
    ],
    forgetPassword
)

UserRoute.post(
    '/change-password',
    [
        check('password','minimum length of password was 8').isLength(8)
    ],
    changePassword
)

UserRoute.post(
    '/go-to-change',
    goToChange
)

UserRoute.get('/getUser/:token',getUser )
export default UserRoute