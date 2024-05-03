import { Router } from 'express';

/* Importando os arquivos do controllers */
import authController from '../controllers/AuthController';

/* Importando middleware */
import loginRequired from '../helpers/loginRequired';

const routes = new Router();

/* Rotas */
routes.get('/', loginRequired, authController.index);
routes.post('/', authController.store);
routes.patch('/', loginRequired, authController.update);

// routes.get('/:id', authController.show);
// routes.delete('/:id', loginRequired, authController.delete);

/* Exportando o módulo */
export default routes;
