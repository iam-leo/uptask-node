import express from 'express';
import { allTask, getSubtasksForTask, newTask, taskByUrl, taskToDelete, tasksHome, updateTask } from '../controllers/tasksController.js';
import { body } from 'express-validator';
import { deleteSubtask, newSubtask, subtaskCompleted } from '../controllers/subtasksController.js';
import { login, newUser } from '../controllers/usersController.js';
import { authUser, closeSession, userAuthenticated } from '../controllers/authController.js';

const router = express.Router();

// Tasks Endpoints
router.get('/', userAuthenticated, tasksHome);
router.get('/all-tasks', userAuthenticated, allTask)
router.post('/new-task', body('task').notEmpty().trim().escape(), userAuthenticated, newTask);
router.get('/task/:url', userAuthenticated, taskByUrl);
router.put('/edit-task/:id', userAuthenticated, body('task').notEmpty().trim().escape(), updateTask);
router.delete('/delete-task/:id', userAuthenticated, taskToDelete);

// Subtasks Endpoints
router.post('/task/:id/new-subtask', userAuthenticated, newSubtask);
router.get('/task/:id/all-subtasks', userAuthenticated, getSubtasksForTask);
router.patch('/task/subtask/is-completed/:id', userAuthenticated, subtaskCompleted);
router.delete('/task/subtask/:id', userAuthenticated, deleteSubtask);
/* router.post('/new-subtask', body('subtask').notEmpty().trim().escape(), newSubtask);
router.put('/edit-subtask/:id', body('subtask').notEmpty().trim().escape(), updateSubtask);
router.delete('/delete-subtask/:id', subtaskToDelete); */

// Users endpoints
router.post('/new-user', newUser);
router.post('/login', authUser ,login);
router.get('/logout', closeSession);

export default router;
