import { Router } from "express";
import { check } from "express-validator";
import { AddQuests, DeleteQuest, GetQuests, JoinQuest } from "./Controllers/QuestRouter.controller.js";

const QuestRouter = Router()

QuestRouter.post('/add/quest',AddQuests)

QuestRouter.post('/join/quest',JoinQuest)

QuestRouter.post('/getQuest',GetQuests)

QuestRouter.post('/delete/quest',DeleteQuest)

export default QuestRouter