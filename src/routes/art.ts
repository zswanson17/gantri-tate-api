import { Request, Response, Router } from 'express';
import { ValidationError } from '../errors';
import Container from 'typedi';
import { ArtService } from '../services/ArtService';
import { asyncHandler } from '../utils';

const router = Router();
const artService = Container.get(ArtService);

router.get(
  '/',
  asyncHandler(async function (request: Request, response: Response) {
    const data = await artService.getAll();
    response.status(200).json(data);
  }),
);

router.get(
  '/:id',
  asyncHandler(async function (request: Request, response: Response) {
    if (!request.params?.id || Number.isNaN(parseInt(request.params.id))) {
      throw new ValidationError('Invalid art id');
    }

    const data = await artService.getOne(parseInt(request.params.id));

    if (!data) {
      response.status(404).send();
      return;
    }

    response.status(200).json(data);
  }),
);

export default router;
