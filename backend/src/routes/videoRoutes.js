import express from 'express';
import { getVideosByProfessor, submitVideo } from '../controllers/videoController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/professor/:professorId', getVideosByProfessor);
router.post('/', requireAuth, submitVideo);

export default router;
