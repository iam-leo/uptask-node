import { Sequelize } from "sequelize";
import { db } from '../config/db.js';
import slug from "slug";

export const Tasks = db.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    modelName: 'tasks',
    createdAt: false,
    updatedAt: false,
    hooks: {
        beforeCreate(newTask) {
            const url = slug(newTask.title).toLocaleLowerCase();
            newTask.url = url;
        }
    }
})