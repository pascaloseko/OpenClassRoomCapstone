import { Router } from 'express';
import userRoute from './users.route';

const routes = Router();

routes.use('/', userRoute);

export default routes;
