import { Router } from "express";
import { AddQuests } from "./Controllers/QuestRouter.controller.js";

const QuestRouter = Router()

QuestRouter.post('/add/quest',AddQuests)

QuestRouter.post('/add/get',AddQuests)

export default QuestRouter