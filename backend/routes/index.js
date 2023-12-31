import express from 'express';
import { allTask, getSubtasksForTask, newTask, taskByUrl, taskIsCompleted, taskToDelete, tasksHome, updateTask } from '../controllers/tasksController.js';
import { body } from 'express-validator';
import { deleteSubtask, newSubtask, subtaskCompleted } from '../controllers/subtasksController.js';
import { confirmAccountUser, getNameUser, login, newUser } from '../controllers/usersController.js';
import { authUser, closeSession, userAuthenticated, sendToken, resetPassword, validateToken } from '../controllers/authController.js';

const router = express.Router();

// Tasks Endpoints
router.get('/', userAuthenticated, tasksHome);
router.get('/all-tasks', userAuthenticated, allTask)
router.post('/new-task', body('task').notEmpty().trim().escape(), userAuthenticated, newTask);
router.get('/task/:url', userAuthenticated, taskByUrl);
router.put('/edit-task/:id', userAuthenticated, body('task').notEmpty().trim().escape(), updateTask);
router.patch('/task-is-completed/:id', userAuthenticated, taskIsCompleted)
router.delete('/delete-task/:id', userAuthenticated, taskToDelete);

// Subtasks Endpoints
router.post('/task/:id/new-subtask', userAuthenticated, newSubtask);
router.get('/task/:id/all-subtasks', userAuthenticated, getSubtasksForTask);
router.patch('/task/subtask/is-completed/:id', userAuthenticated, subtaskCompleted);
router.delete('/task/subtask/:id', userAuthenticated, deleteSubtask);

// Users endpoints
router.post('/new-user', newUser);
router.get('/confirm-password/:email', confirmAccountUser)
router.post('/login', authUser, login);
router.get('/logout', closeSession);
router.get('/name-user', getNameUser);

// Restablecer contraseña
router.post('/reset-password', sendToken);
router.get('/reset-password/:token', validateToken);
router.post('/reset-password/:token', resetPassword);

export default router;
