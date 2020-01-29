import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ message: 'Hello world! My name is Dhemes' })
);

export default routes;
