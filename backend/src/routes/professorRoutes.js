import express from 'express';
import {
  getProfessors,
  getProfessorById,
  compareProfessors,
  getLeaderboards,
  toggleFollowProfessor
} from '../controllers/professorController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProfessors);
router.get('/compare', compareProfessors);
router.get('/leaderboard', getLeaderboards);
router.get('/:id', getProfessorById);
router.post('/:id/follow', requireAuth, toggleFollowProfessor);

export default router;
