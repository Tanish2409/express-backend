import express from 'express';
import postRouter from './post.routes';

const mainRouter = express.Router();

mainRouter.use('/posts', postRouter);

export default mainRouter;
