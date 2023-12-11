import express from 'express';
import { proyectosHome } from '../controllers/proyectosController.js';

const router = express.Router();

router.get('/', proyectosHome);

export default router;
