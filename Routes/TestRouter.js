import { Router } from "express";
import { check } from "express-validator";
import { Add, DeleteTest, Top, GetAll, GetChecked, GetTest, NumberTests, Search, Start, getTest, changeAnsver, GetAnsvers, getUserTests } from "./Controllers/TestRouter.controller.js";

const TestRouter = Router()

TestRouter.post(
    '/add/test',
    [
        check('title','minimum length of title was 4').isLength(4),
        check('about','minimum length of text was 10').isLength(10)
    ],
    Add)

TestRouter.post('/getTest',GetAll)

TestRouter.get('/get-test/:id', getTest)

TestRouter.post('/get/myTests',GetTest)

TestRouter.post('/get/length',NumberTests)

TestRouter.post('/get/start',Start)

TestRouter.post('/set/answers',changeAnsver)

TestRouter.post('/top',Top)

TestRouter.post('/get/checked',GetChecked)

TestRouter.post('/delete/test',DeleteTest)

TestRouter.post('/get/ansvers',GetAnsvers)

TestRouter.post('/get/search',Search)

TestRouter.get("/get-answers/:testId/:userId", getUserTests)


export default TestRouter