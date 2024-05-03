import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { join } from 'path';

/* Importando o arquivo de routes */
import routes from './src/routes/routes';

/* Conectar ao banco de dados */
import './src/db';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        /* Middleware de registros de solicitações HTTP */
        this.app.use(morgan(':method :url HTTP/:http-version :status :res[content-length] - :response-time ms :remote-addr :remote-user :referrer :date[web] :total-time[digits]'));

        /* Criando uma pasta estática */
        this.app.use(express.static(join(__dirname, 'uploads')));
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;
