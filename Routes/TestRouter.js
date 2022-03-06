import { Router } from "express";
import { Add, GetAll } from "./Controllers/TestRouter.controller.js";

const TestRouter = Router()

TestRouter.post('/add/test',Add)

TestRouter.post('/getTest',GetAll)

export default TestRouter