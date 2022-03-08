import { Router } from "express";
import { check } from "express-validator";
import { AddQuests, DeleteQuest, GetQuests } from "./Controllers/QuestRouter.controller.js";

const QuestRouter = Router()

QuestRouter.post(
    '/add/quest',AddQuests)

QuestRouter.post('/getQuest',GetQuests)

QuestRouter.post('/delete/quest',DeleteQuest)

export default QuestRouter