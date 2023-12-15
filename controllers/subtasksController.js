import { createSubtask, deleteSubtasks, subtaskIsCompleted } from "../services/subtasksService.js";

const newSubtask = async ( req, res ) => {
    const { id } = req.params;

    // Validar que el input contenga algo
    const {subtask} = req.body;

    let errores = [];

    if (!subtask) {
        errores.push({message: 'The subtask field is required'});
    }

    //Si hay errores
    if (errores.length > 0) {
        res.status(400).send(errores);
    }

    //Si no hay errores
    try {
        const newSubtask = await createSubtask(id, subtask, 0);
        res.status(201).send(newSubtask);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

const subtaskCompleted = async ( req, res ) => {
    const { id } = req.params;

    try {
        const subtaskUpdated = await subtaskIsCompleted(id)
        res.status(201).send(subtaskUpdated);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

const deleteSubtask = async ( req, res ) => {
    const { id } = req.params;

    try {
        const subtaskDeleted = await deleteSubtasks(id);
        res.status(201).send(subtaskDeleted);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export {
    newSubtask,
    subtaskCompleted,
    deleteSubtask
}