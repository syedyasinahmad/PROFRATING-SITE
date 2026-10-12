import express from 'express';
import { getQuizQuestions, matchQuizProfessors } from '../controllers/quizController.js';

const router = express.Router();

router.get('/questions', getQuizQuestions);
router.post('/match', matchQuizProfessors);

export default router;
