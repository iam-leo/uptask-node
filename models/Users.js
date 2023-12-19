import { Sequelize } from "sequelize";
import { db } from '../config/db.js';
import { Tasks } from "./Tasks.js";
import  bcrypt from "bcrypt-nodejs";

export const Users = db.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    },
    expiration: {
        type: Sequelize.DATE,
        allowNull: true
    }
},{
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});

Users.hasMany(Tasks);