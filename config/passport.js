import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../models/Users.js';
import bcrypt from 'bcrypt-nodejs';

// Local strategy - Login con credenciales propias (email y contraseña)
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const user = await Users.findOne({ where: { email: email } });

                if (!user) {
                    return done(null, false, { message: 'No existe el usuario' });
                }

                const isPasswordValid = await bcrypt.compareSync(password, user.password);

                if (!isPasswordValid) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Serializar el usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar el usuario
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findByPk(id);

        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

export {
    passport
}