import { Router } from 'express';

const routes = new Router();

routes.get('/', (req,res) => res.status(400).json({ message: 'ok' }));

export default routes;