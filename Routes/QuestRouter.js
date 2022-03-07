import { Router } from "express";
import { check } from "express-validator";
import { AddQuests, GetQuests } from "./Controllers/QuestRouter.controller.js";

const QuestRouter = Router()

QuestRouter.post(
    '/add/quest',AddQuests)

QuestRouter.post('/getQuest',   GetQuests)

export default QuestRouter