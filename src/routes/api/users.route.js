import { Router } from 'express';
import AuthMiddleWare from '../../middleware/auth';
import UserController from '../../controllers/user.controller'

const isAuth = AuthMiddleWare.isAuthenticated;

const router = Router();

router.post('/user', UserController.createUser);

export default router;