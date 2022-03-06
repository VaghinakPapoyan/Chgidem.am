import { Router } from "express";
import { check } from "express-validator";
import { Add, GetAll } from "./Controllers/TestRouter.controller.js";

const TestRouter = Router()

TestRouter.post(
    '/add/test',
    [
        check('title','minimum length of title was 8').isLength(8),
        check('about','minimum length of text was 12').isLength(12)
    ],
    Add)

TestRouter.post('/getTest',GetAll)

export default TestRouter