import express from 'express';
import { newTask, tasksHome } from '../controllers/tasksController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', tasksHome);
router.post('/new-task', body('task').notEmpty().trim().escape(), newTask);

export default router;
