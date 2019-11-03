import { Router } from 'express';
import AuthMiddleWare from '../../middleware/auth';
import GIFController from '../../controllers/gif.controller';
const upload = require('../../../multerConfig');

const isAuth = AuthMiddleWare.isAuthenticated;

const router = Router();

router.post('/gif', isAuth, upload.any(), GIFController.createGifPost);
// router.get('/gifs', isAuth, GIFController.listArticles);
// router.put('/gif/:id', isAuth, upload.any(), GIFController.updateGif);
// router.get('/gif/:id', isAuth, GIFController.getOne);
// router.delete('/gif/:id', isAuth, GIFController.deleteGif);
// router.post('/gif/article/:id/comment', isAuth, GIFController.commentArticle);


export default router;
