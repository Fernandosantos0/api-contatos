import { Router } from 'express';

/* Importando o arquivo do controller */
import contatoController from '../controllers/ContatoController';

/* Importando o middleware */
import loginRequired from '../helpers/loginRequired';

const routes = new Router();

routes.get('/', loginRequired, contatoController.index);
routes.get('/:id', loginRequired, contatoController.show);
routes.post('/', loginRequired, contatoController.store);
routes.patch('/:id', loginRequired, contatoController.update);
routes.delete('/:id', loginRequired, contatoController.delete);

export default routes;
