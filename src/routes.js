import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import DeliveryGuyController from './app/controllers/DeliveryGuyController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/delivery-guys', DeliveryGuyController.index);
routes.post('/delivery-guys', DeliveryGuyController.store);
routes.put('/delivery-guys/:id', DeliveryGuyController.update);
routes.delete('/delivery-guys/:id', DeliveryGuyController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
