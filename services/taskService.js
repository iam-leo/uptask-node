import { Tasks } from "../models/Tasks.js";
import { Subtasks } from "../models/Subtasks.js";

const createTask = async (title, url, completed, userId) => {
    try {
        const task = new Tasks();

        //Validar que los campos no vengan erroneos
        if (!title) {
            throw new Error('Title and url are required');
        }

        task.title = title;
        task.url = url;
        task.completed = completed;
        task.UserId = userId;

        const taskCreated = await task.save();

        return taskCreated;
    } catch (error) {
        throw error;
    }
}

const getAllTasksByUser = async ( userId ) =>{
    try {
        const tasks = await Tasks.findAll({ where: { UserId: userId}});
        return tasks;
    } catch (error) {
        throw error;
    }
}

const getTaskByUrl = async (url, userId) => {
    try {
        const task = await Tasks.findOne({ where: { url: url, UserId: userId } });
        return task;
    } catch (error) {
        throw error;
    }
}

const editTask = async (id, title) => {
    try {
        const task = await Tasks.findOne({ where: { id: id } });
        console.log(id)

        if (!task) {
            throw new Error('Task not found');
        }

        task.title = title;

        const taskUpdated = await task.save();

        return taskUpdated;
    } catch (error) {
        throw error;
    }
}

const deleteTask = async ( id ) => {
    try {
        const task = await Tasks.findOne({ where: { id: id } });

        if (!task) {
            throw new Error('Task not found');
        }

        const taskDeleted = await task.destroy();

        return taskDeleted;
    } catch (error) {
        throw error;
    }
}

// Obtener subtareas de una tarea
const getSubtasksByTaskId = async (taskId) => {
    try {
        const subtasks = await Subtasks.findAll({
            where: { taskId: taskId },
            // Incluir a que tarea corresponden las subtareas (de ser necesario)
            /*include: [
                {
                    model: Tasks,
                    as: 'task'
                }
            ]*/
        });
        return subtasks;
    } catch (error) {
        throw error;
    }
}

export {
    createTask,
    getAllTasksByUser,
    getTaskByUrl,
    editTask,
    deleteTask,
    getSubtasksByTaskId
}