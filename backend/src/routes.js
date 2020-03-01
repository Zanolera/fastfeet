import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import AvatarController from './app/controllers/AvatarController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import NotificationController from './app/controllers/NotificationController';
import AvailableDeliveryController from './app/controllers/AvailableDeliveryController';
import CompleteDeliveryController from './app/controllers/CompleteDeliveryController';
import WithdrawalDeliveryController from './app/controllers/WithdrawalDeliveryController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Routes below are using authMiddleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// Admin routes
// Recipients
routes.get('/recipients', adminMiddleware, RecipientController.index);
routes.post('/recipients', adminMiddleware, RecipientController.store);
routes.put('/recipients/:id', adminMiddleware, RecipientController.update);

// Deliveryman
routes.get('/deliverymans', adminMiddleware, DeliverymanController.index);
routes.post('/deliverymans', adminMiddleware, DeliverymanController.store);
routes.put('/deliverymans/:id', adminMiddleware, DeliverymanController.update);
routes.delete(
    '/deliverymans/:id',
    adminMiddleware,
    DeliverymanController.delete
);

// Delivery
routes.get('/deliveries', adminMiddleware, DeliveryController.index);
routes.post('/deliveries', adminMiddleware, DeliveryController.store);
routes.put('/deliveries/:id', adminMiddleware, DeliveryController.update);
routes.delete('/deliveries/:id', adminMiddleware, DeliveryController.delete);

// Delivery by Deliveryman
routes.get(
    '/deliverymans/:deliverymanId/deliveries',
    AvailableDeliveryController.index
);
routes.get(
    '/deliverymans/:deliverymanId/deliveries/completed',
    CompleteDeliveryController.index
);

// Delivery updates by Deliveryman
routes.put(
    '/deliveries/withdrawal/:deliveryId',
    WithdrawalDeliveryController.update
);

routes.put(
    '/deliveries/complete/:deliveryId',
    CompleteDeliveryController.update
);

// Notification
routes.get('/notifications/:deliverymanId', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Avatar
routes.post('/files', upload.single('file'), AvatarController.store);

export default routes;
