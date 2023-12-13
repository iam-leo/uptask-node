import express from "express";
import routes from './routes/index.js'

//import bodyParser from 'body-parser'

const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));

// Analizar cuerpos JSON (no body parser)
app.use(express.json())

app.use('/', routes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})