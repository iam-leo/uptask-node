import { createTask, deleteTask, editTask, getAllTasksByUser, getSubtasksByTaskId, getTaskByUrl } from "../services/taskService.js";

const tasksHome = (req, res) => {
    res.send('Usuario autorizado');
}

const newTask = async(req, res) => {
    // Validar que el input contenga algo
    const {task} = req.body

    // Obtener el usuario logeado
    const userId = req.user.id;

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
        const newTask = await createTask(task, '', 0, userId);
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400);
    }
}

const allTask = async(req, res) => {
    try {
        // Obtener el usuario logeado
        const userId = req.user.id;

        const tasks = await getAllTasksByUser( userId );
        res.status(200).send(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const taskByUrl = async (req, res, next) => {
    try {
        const {url} = req.params;
        // Obtener el usuario logeado
        const userId = req.user.id;

        const task = await getTaskByUrl(url, userId);

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

const getSubtasksForTask = async ( req, res ) => {
    const {id} = req.params;

    try {
        const subtasks = await getSubtasksByTaskId(id);
        res.status(200).send(subtasks);
    } catch (error) {
        res.status(400).send(error);
    }
}

export {
    tasksHome,
    newTask,
    allTask,
    taskByUrl,
    updateTask,
    taskToDelete,
    getSubtasksForTask
}