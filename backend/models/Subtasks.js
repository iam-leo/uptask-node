import { Sequelize } from "sequelize";
import { db } from '../config/db.js';
import { Tasks } from "./Tasks.js";

export const Subtasks = db.define('subtasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

Subtasks.belongsTo(Tasks);