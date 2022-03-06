import { Router } from "express";
import { check } from "express-validator";
import { AddQuests, GetQuests } from "./Controllers/QuestRouter.controller.js";

const QuestRouter = Router()

QuestRouter.post(
    '/add/quest',
    [
        check('title','minimum length of title was 6').isLength(6),
        check('quest','minimum length of text was 6').isLength(6),
        check('ansvers','minimum lenght of ansvers was 2').isLength(1),
        check('trueAnsver','true ansver was not been empty').not().isEmpty(),
    ],
    AddQuests)

QuestRouter.post('/getQuests',GetQuests)

export default QuestRouter