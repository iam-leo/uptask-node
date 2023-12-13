import { createTask } from "../services/taskService.js";

const tasksHome = (req, res) => {
    res.send('From /home');
}

const newTask = async(req, res) => {
    // Validar que el input contenga algo
    const {task} = req.body

    let errores = [];

    if (!task) {
        errores.push({message: 'El campo task es requerido'});
    }

    //Si hay errores
    if (errores.length > 0) {
        res.status(400).send(errores);
    }

    //Si no hay errores
    try {
        const newTask = await createTask(task, '', 0);
        res.status(201).send(newTask);
    } catch (error) {
        console.log(error)
        res.status(400);
    }
}

export {
    tasksHome,
    newTask
}