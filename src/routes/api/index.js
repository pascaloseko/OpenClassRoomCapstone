import { Router } from 'express';
import userRoute from './users.route';
import gifRoute from './gif.route';


const routes = Router();

routes.use('/', userRoute);
routes.use('/', gifRoute);

export default routes;
