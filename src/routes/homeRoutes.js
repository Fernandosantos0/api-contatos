import { Router } from 'express';

/* Importando o arquivo do controller */
import homeController from '../controllers/HomeController';

const routes = new Router();

routes.get('/', homeController.home);

export default routes;
