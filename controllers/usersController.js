import { confirmAccount, createUser, userLogin } from "../services/usersService.js";
import { sendEmail } from "../helpers/sendEmail.js";

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

        // Generar reset url
        const confirmURL = `http://${req.headers.host}/confirm-password/${newUser.email}`;

        sendEmail(confirmURL, newUser.email, 'Confirmar cuenta', 'confirm');

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

const confirmAccountUser = async ( req, res ) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).send({message: 'Email not valid!'});
    }

    try {
        const user = await confirmAccount(email);

        res.status(200).send('Account confirmed!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export {
    newUser,
    confirmAccountUser,
    login
}