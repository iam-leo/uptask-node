import passport from "passport";
import { getUserByEmail } from "../services/usersService.js";
import crypto from "crypto";
import { Users } from "../models/Users.js";
import { Sequelize } from "sequelize";
import  bcrypt from "bcrypt-nodejs";
import { sendEmail } from "../helpers/sendEmail.js";
import 'dotenv/config'

const Op = Sequelize.Op;

const authUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            // Manejar errores específicos aquí y pasar la información al controlador
            if (info && info.message === 'User not found!') {
                req.authError = 'User not found';
            } else if (info && info.message === 'Invalid password!') {
                req.authError = 'Invalid password';
            }
            return next();
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al iniciar sesión', error: err });
            }
            return next();
        });
    })(req, res, next);
};

const userAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(400).send('Usuario no autenticado');
}

const closeSession = (req, res) => {
    req.session.destroy( () => {
        res.clearCookie('connect.sid');
        res.status(200).send({ message: 'Session closed' });
    })
}

const sendToken = async (req, res) => {
    // verificar que el usuario existe
    const email = req.body.email;
    console.log(email)
    try{
        const user = await getUserByEmail(email);

        //Generar token
        user.token = crypto.randomBytes(20).toString('hex');
        user.expiration = Date.now() + 3600000;
        await user.save();


        // Generar reset url
        const frontURL = process.env.URL_APP
        const resetURL = `${frontURL}/reset-password/${user.token}`;

        sendEmail(resetURL, user.email, 'Resetear password', 'reset-pass');

        //Enviar token
        res.status(200).send({ message: 'Usuario existente'})

    }catch (error){
        return res.status(400).send(error.message);
    }
}

const validateToken = async (req, res) => {
    try{
        const user = await Users.findOne({ where: { token: req.params.token } });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        res.status(200).send({ message: 'Token autorizado! '});

    }catch (error){
        return res.status(400).send(error.message);
    }
}

const resetPassword = async (req, res) => {
    try {
        const newPassword = req.body.password;
        const token = req.params.token;

        if (!newPassword) {
            throw new Error('Debes ingresar una nueva contraseña');
        }

         //Verificar que el token es valido y si no expiró
        const user = await Users.findOne({
                                where: {
                                    token: token,
                                    expiration: {
                                        [Op.gte]: Date.now()
                                    }
                                } });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Hashear nuevo password
        user.password =  await bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
        user.token = null;
        user.expiration = null;

        await user.save();

        res.status(200).send({ message: 'Contraseña restablecida'});
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export{
    authUser,
    userAuthenticated,
    closeSession,
    sendToken,
    validateToken,
    resetPassword
}
