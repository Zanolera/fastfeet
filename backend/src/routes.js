import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import AvatarController from './app/controllers/AvatarController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// deste ponto para baixo todas rotas exigem autenticacao
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// Admin routes
routes.get('/deliverymans', adminMiddleware, DeliverymanController.index);
routes.post('/deliverymans', adminMiddleware, DeliverymanController.store);
routes.put('/deliverymans/:id', adminMiddleware, DeliverymanController.update);
routes.delete(
    '/deliverymans/:id',
    adminMiddleware,
    DeliverymanController.delete
);

routes.get('/deliverys', adminMiddleware, DeliveryController.index);
routes.post('/deliverys', adminMiddleware, DeliveryController.store);
routes.put('/delivery/:id', adminMiddleware, DeliveryController.put);
routes.delete('/delivery/:id', adminMiddleware, DeliveryController.delete);

routes.post('/files', upload.single('file'), AvatarController.store);

routes.get('/recipients', adminMiddleware, RecipientController.index);
routes.post('/recipients', adminMiddleware, RecipientController.store);
routes.put('/recipients/:id', adminMiddleware, RecipientController.update);

export default routes;
