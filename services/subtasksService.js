import { Subtasks } from "../models/Subtasks.js";
import { Tasks } from "../models/Tasks.js";


const createSubtask = async (taskId, description, completed) => {
    try {
        const subtask = new Subtasks();

        //Validar que los campos no vengan erroneos
        if (!description) {
            throw new Error('Description is required');
        }

        if (!taskId) {
            throw new Error('Task ID is required');
        }

        // Validar que la tarea exista en la DB
        const task = await Tasks.findOne({ where: { id: taskId } });

        if (!task) {
            throw new Error('Task not found');
        }

        subtask.description = description;
        subtask.completed = completed;
        subtask.taskId = taskId;

        const subtaskCreated = await subtask.save();

        return subtaskCreated;
    } catch (error) {
        throw error;
    }
}

const subtaskIsCompleted = async (id) => {
    try {
        const subtask = await Subtasks.findOne({ where: { id: id } });

        if (!subtask) {
            throw new Error('Subtask not found');
        }

        subtask.completed =!subtask.completed;

        const subtaskUpdated = await subtask.save();

        return subtaskUpdated;
    } catch (error) {
        throw error;
    }
}

export {
    createSubtask,
    subtaskIsCompleted
}