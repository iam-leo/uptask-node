import express from 'express';
import routes from './routes/index.js';
import { db } from './config/db.js';
import './models/Tasks.js';
import './models/Subtasks.js';
import './models/Users.js';
import { passport } from './config/passport.js';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

// Crear conexion DB (tambien crea las tablas)
db.sync()
    .then(() => {
        console.log('Conexion exitosa a la base de datos');
    })
    .catch((err) => {
        console.log(err);
    });

const SequelizeStore = connectSessionSequelize(session.Store);

// Almacenamiento de sesiones
const myStore = new SequelizeStore({
    db: db,
});

const app = express();

//Definir el puerto
const PORT = process.env.PORT || 3000;

// Analizar cuerpos JSON (no body parser)
app.use(express.json());

app.use(cookieParser());

//Permitir CORS
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.set('trust proxy', 1);

app.use(
    session({
        secret: 'supersecret',
        store: myStore,
        resave: false,
        saveUninitialized: true,
        maxAge: 7200000,
        cookie: {
            secure: true, //Esto es para que funcione en https
            httpOnly: true, //No se puede acceder desde javascript
            domain: 'uptask-4bso.onrender.com',
            path: '/',
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        },
        proxy: true,
    })
);

app.use(passport.initialize());

app.use(passport.session());

app.use('/', routes);

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});
