import { createTask, deleteTask, editTask, getAllTasks, getTaskByUrl } from "../services/taskService.js";

const tasksHome = (req, res) => {
    res.send('From /home');
}

const newTask = async(req, res) => {
    // Validar que el input contenga algo
    const {task} = req.body

    let errores = [];

    if (!task) {
        errores.push({message: 'The task field is required'});
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

const allTask = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(400);
    }
}

const taskByUrl = async (req, res, next) => {
    try {
        const {url} = req.params;
        const task = await getTaskByUrl(url);

        if (!task) {
            return res.status(404).send({message: 'Task not found!'});
        }

        res.status(200).send(task);
    } catch (error) {
        res.status(400);
    }
}

const updateTask = async (req, res) => {
    const {id} = req.params;
    const {task} = req.body;

    let errores = [];

    if (!task) {
        errores.push({message: 'The task field is required'});
    }

    //Si hay errores
    if (errores.length > 0) {
        res.status(400).send(errores);
    }

    //Si no hay errores
    try{
        const taskUpdated = await editTask(id, task);
        res.status(200).send(taskUpdated);
    } catch (error) {
        res.status(400);
    }
}

const taskToDelete = ( req, res ) => {
    const {id} = req.params;

    try {
        const taskDeleted = deleteTask(id);
        res.status(200).send('Task successfully deleted!');
    } catch (error) {
        res.status(400);
    }
}

export {
    tasksHome,
    newTask,
    allTask,
    taskByUrl,
    updateTask,
    taskToDelete
}