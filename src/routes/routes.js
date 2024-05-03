import { Router } from 'express';

/* Importando os arquivos de routes */
import homeRoutes from './homeRoutes';
import authRoutes from './authRoutes';
import tokenRoutes from './tokenRoutes';
import contatoRoutes from './contatoRoutes';
import fotoRoutes from './fotoRoutes';

const routes = new Router();

routes.use('/', homeRoutes);
routes.use('/login', authRoutes);
routes.use('/tokens', tokenRoutes);
routes.use('/contatos', contatoRoutes);
routes.use('/fotos', fotoRoutes);

routes.use((req, res, next) => {
    res.status(404).json({
        message: 'not found',
    });
});

export default routes;
