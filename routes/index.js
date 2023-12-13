import express from 'express';
import { newTask, tasksHome } from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', tasksHome);
router.post('/new-task', newTask);

export default router;
