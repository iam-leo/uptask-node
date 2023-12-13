const tasksHome = (req, res) => {
    res.send('From /home');
}

const newTask = (req, res) => {
    const {task} = req.body
    console.log( task );
    res.send('New task created!');
}

export {
    tasksHome,
    newTask
}