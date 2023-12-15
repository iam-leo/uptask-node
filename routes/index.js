import express from 'express';
import { allTask, newTask, taskByUrl, tasksHome, updateTask } from '../controllers/tasksController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', tasksHome);
router.get('/all-tasks', allTask)
router.post('/new-task', body('task').notEmpty().trim().escape(), newTask);
router.get('/task/:url', taskByUrl);
router.put('/edit-task/:id', body('task').notEmpty().trim().escape(), updateTask);

export default router;
