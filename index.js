import express from "express";
import routes from './routes/index.js';
import { db } from "./config/db.js";
import "./models/Tasks.js";
import "./models/Subtasks.js";
import "./models/Users.js";
import { passport } from "./config/passport.js";
import session from "express-session";
import cookieParser from "cookie-parser";

// Crear conexion DB (tambien crea las tablas)
db.sync()
    .then(() => {
        console.log("Conexion exitosa a la base de datos");
    })
    .catch(err => {
        console.log(err);
    })

const app = express();

// Analizar cuerpos JSON (no body parser)
app.use(express.json());

app.use(cookieParser());

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})