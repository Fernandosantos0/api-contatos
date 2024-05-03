import { Router } from 'express';

/* Importando os arquivo do controller */
import tokenController from '../controllers/TokenController';

const routes = new Router();

/* Rota */
routes.route('/').post(tokenController.store);

/* Exportando o módulo */
export default routes;
