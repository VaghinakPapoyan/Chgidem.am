import { Router } from "express";
import { check } from "express-validator";
import { ChangeUser } from "./Controllers/ChangeUser.js";

const ChangeUserRouter = Router()

ChangeUserRouter.put(
    '/change-user-data',
    [
        check('username','minimum length of name was 8').isLength(8),
        check('nickname','minimum length of password was 6').isLength(6)
    ],
    ChangeUser
)

export default ChangeUserRouter