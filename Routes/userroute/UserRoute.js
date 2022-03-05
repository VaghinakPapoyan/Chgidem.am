import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./UserRoute.controller.js";

const UserRoute = Router()

UserRoute.post(
    '/register',
    [
        check('name','minimum length of name was 4').isLength(4),
        check('password','minimum length of password was 6').isLength(6)
    ],
    register
    )

    UserRoute.post(
    '/login',
    [
        check('name','minimum length of name was 4').isLength(4),
        check('password','minimum length of password was 6').isLength(6)
    ],
    login
    )

export default UserRoute