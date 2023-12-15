import { Users } from "../models/Users.js";
import bcrypt from 'bcrypt-nodejs';

const createUser = async (name, email, password) => {
    try {
        const user = new Users();

        // Si el email ya esta asociado a un usuario
         if (await Users.findOne({ where: { email: email } })) {
            throw new Error('User already exists!');
        }

        user.name = name;
        user.email = email;
        user.password = password;

        const userCreated = await user.save();

        return userCreated;
    } catch (error) {
        throw error;
    }
}

const userLogin = async (email, password) => {
    try {
        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            throw new Error('User not found!');
        }

        const isPasswordValid = await bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password!');
        }

        return user;
    } catch (error) {
        throw error;
    }
}

export {
    createUser,
    userLogin
}