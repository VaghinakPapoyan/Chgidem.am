import { Router } from "express";
import { check } from "express-validator";
import { Add, DeleteTest, GetAll, GetChecked, GetTest, NumberTests, Start } from "./Controllers/TestRouter.controller.js";

const TestRouter = Router()

TestRouter.post(
    '/add/test',
    [
        check('title','minimum length of title was 4').isLength(4),
        check('about','minimum length of text was 10').isLength(10)
    ],
    Add)

TestRouter.post('/getTest',GetAll)

TestRouter.post('/get/myTests',GetTest)

TestRouter.post('/get/length',NumberTests)

TestRouter.post('/get/start',Start)

TestRouter.post('/get/checked',GetChecked)

TestRouter.post('/delete/test',DeleteTest)


export default TestRouter