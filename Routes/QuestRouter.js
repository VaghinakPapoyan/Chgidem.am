import { Router } from "express";
import { check } from "express-validator";
import { AddQuests, DeleteQuest, GetQuest, GetQuests, JoinQuest, UpdateOne } from "./Controllers/QuestRouter.controller.js";

const QuestRouter = Router()

QuestRouter.post('/add/quest',AddQuests)

QuestRouter.post('/join/quest',JoinQuest)

QuestRouter.post('/getQuest',GetQuests)

QuestRouter.post('/getOne',GetQuest)

QuestRouter.post('/updateOne',UpdateOne)

QuestRouter.post('/delete/quest',DeleteQuest)

export default QuestRouter