import { Router } from 'express';

import loginRequired from '../helpers/loginRequired';

/* Importando o arquivo do controller */
import fotoController from '../controllers/FotoControle';

const routes = new Router();

routes.post('/', loginRequired, fotoController.store);

export default routes;
