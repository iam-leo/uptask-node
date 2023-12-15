import { createUser, userLogin } from "../services/usersService.js";

const newUser = async ( req, res ) => {
    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).send({message: 'Name is required'});
    }

    if (!email) {
        return res.status(400).send({message: 'Email is required'});
    }

    if (!password) {
        return res.status(400).send({message: 'Password is required'});
    }

    if (password.length < 6) {
        return res.status(400).send({message: 'Password must be at least 6 characters'});
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return res.status(400).send({message: 'Invalid email'});
    }

    try {
        const newUser = await createUser(name, email, password);

        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const login = async ( req, res ) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send({message: 'Email is required'});
    }

    if (!password) {
        return res.status(400).send({message: 'Password is required'});
    }

    if (password.length < 6) {
        return res.status(400).send({message: 'Password must be at least 6 characters'});
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return res.status(400).send({message: 'Invalid email'});
    }

    try {
        const user = await userLogin(email, password);

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export {
    newUser,
    login
}