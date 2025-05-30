import express from 'express';
import prompt from "../controller/prompt_controller.js";
import userMiddleware from "../middlware/prompt.middleware.js";

const router = express.Router();

router.get('/prompt',userMiddleware,prompt);

export default router;