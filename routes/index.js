import express from 'express';
import { allTask, getSubtasksForTask, newTask, taskByUrl, taskToDelete, tasksHome, updateTask } from '../controllers/tasksController.js';
import { body } from 'express-validator';
import { newSubtask, subtaskCompleted } from '../controllers/subtasksController.js';

const router = express.Router();

// Tasks Endpoints
router.get('/', tasksHome);
router.get('/all-tasks', allTask)
router.post('/new-task', body('task').notEmpty().trim().escape(), newTask);
router.get('/task/:url', taskByUrl);
router.put('/edit-task/:id', body('task').notEmpty().trim().escape(), updateTask);
router.delete('/delete-task/:id', taskToDelete);

// Subtasks Endpoints
router.post('/task/:id/new-subtask', newSubtask);
router.get('/task/:id/all-subtasks', getSubtasksForTask);
router.patch('/subtask/is-completed/:id', subtaskCompleted);
/* router.post('/new-subtask', body('subtask').notEmpty().trim().escape(), newSubtask);
router.put('/edit-subtask/:id', body('subtask').notEmpty().trim().escape(), updateSubtask);
router.delete('/delete-subtask/:id', subtaskToDelete); */

export default router;
