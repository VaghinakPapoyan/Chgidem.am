import { Router } from "express";
import { Add } from "./Controllers/TestRouter.controller.js";

const TestRouter = Router()

TestRouter.post('/add/test',Add)

export default TestRouter