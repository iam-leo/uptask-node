import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('From /home');
});

router.get('/example', (req, res) => {
    res.send('From /example');
});

export default router;
