import { createSubtask } from "../services/subtasksService.js";

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

export {
    newSubtask
}