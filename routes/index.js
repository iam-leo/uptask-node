import express from 'express';
import { allTask, newTask, tasksHome } from '../controllers/tasksController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', tasksHome);
router.get('/all-tasks', allTask)
router.post('/new-task', body('task').notEmpty().trim().escape(), newTask);

export default router;
