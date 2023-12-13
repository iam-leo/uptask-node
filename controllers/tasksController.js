const tasksHome = (req, res) => {
    res.send('From /home');
}

const newTask = (req, res) => {
    // Validar que el input contenga algo
    const {task} = req.body

    let errores = [];

    if (!task) {
        errores.push({message: 'El campo task es requerido'});
    }

    //Si hay errores
    if (errores.length > 0) {
        res.status(400).send(errores);
    } else{
        // No hay errores. Insertar en la DB
        
        res.status(200).send({message: 'Se ha creado la tarea correctamente'});
    }
}

export {
    tasksHome,
    newTask
}