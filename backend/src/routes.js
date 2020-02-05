import { Router } from 'express';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.get('/', (req, res) => res.status(400).json({ message: 'ok' }));
routes.post('/users', UserController.store);
routes.post('/recipients', RecipientController.store);

export default routes;
