import { Router } from 'express';
import MoviesController from './controllers/MoviesController';

const routes = Router();

routes.get('/library', MoviesController.getAll);

export default routes;
