import { Router } from "express";
import { AddQuests, GetQuests } from "./Controllers/QuestRouter.controller.js";

const QuestRouter = Router()

QuestRouter.post('/add/quest',AddQuests)

QuestRouter.post('/add/get',GetQuests)

export default QuestRouter