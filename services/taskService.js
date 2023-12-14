import { Tasks } from "../models/Tasks.js";

const createTask = async (title, url, completed) => {
    try {
        const task = new Tasks();

        //Validar que los campos no vengan erroneos
        if (!title) {
            throw new Error('Title and url are required');
        }

        task.title = title;
        task.url = url;
        task.completed = completed;

        const taskCreated = await task.save();

        return taskCreated;
    } catch (error) {
        throw error;
    }
}

const getAllTasks = async () =>{
    try {
        const tasks = await Tasks.findAll();
        return tasks;
    } catch (error) {
        throw error;
    }
}

export {
    createTask,
    getAllTasks
}