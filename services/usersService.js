import { Users } from "../models/Users.js";

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

export {
    createUser
}