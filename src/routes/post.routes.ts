import { getPosts } from '@/controllers/post.controllers';
import express from 'express';

const postRouter = express.Router();

/**
 * Method: GET
 * Route: /api/posts
 */
postRouter.get('/', getPosts);

export default postRouter;
