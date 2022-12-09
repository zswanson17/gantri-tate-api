import { Request, Response, Router } from 'express';
import Container from 'typedi';
import { CommentService } from '../services';
import { asyncHandler } from '../utils';

const router = Router();
const commentService = Container.get(CommentService);

router.post(
  '/api/art/:id/comments',
  asyncHandler(async function (request: Request, response: Response) {
    const comment = await commentService.create({
      artId: parseInt(request.params.id),
      userId: request.body.userId,
      name: request.body.name,
      content: request.body.content,
    });

    response.status(201).json(comment);
  }),
);

export default router;
