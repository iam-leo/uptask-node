import express from 'express';
import { allTask, getSubtasksForTask, newTask, taskByUrl, taskToDelete, tasksHome, updateTask } from '../controllers/tasksController.js';
import { body } from 'express-validator';
import { deleteSubtask, newSubtask, subtaskCompleted } from '../controllers/subtasksController.js';
import { login, newUser } from '../controllers/usersController.js';
import { authUser, userAuthenticated } from '../controllers/authController.js';

const router = express.Router();

// Tasks Endpoints
router.get('/', userAuthenticated, tasksHome);
router.get('/all-tasks', allTask)
router.post('/new-task', body('task').notEmpty().trim().escape(), newTask);
router.get('/task/:url', taskByUrl);
router.put('/edit-task/:id', body('task').notEmpty().trim().escape(), updateTask);
router.delete('/delete-task/:id', taskToDelete);

// Subtasks Endpoints
router.post('/task/:id/new-subtask', newSubtask);
router.get('/task/:id/all-subtasks', userAuthenticated, getSubtasksForTask);
router.patch('/task/subtask/is-completed/:id', subtaskCompleted);
router.delete('/task/subtask/:id', deleteSubtask);
/* router.post('/new-subtask', body('subtask').notEmpty().trim().escape(), newSubtask);
router.put('/edit-subtask/:id', body('subtask').notEmpty().trim().escape(), updateSubtask);
router.delete('/delete-subtask/:id', subtaskToDelete); */

// Users endpoints
router.post('/new-user', newUser);
router.post('/login', authUser ,login);

export default router;
