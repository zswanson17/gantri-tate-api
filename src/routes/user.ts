import { Request, Response, Router } from 'express';
import Container from 'typedi';
import { UserService } from '../services';
import { asyncHandler } from '../utils';

const router = Router();
const userService = Container.get(UserService);

router.get(
  '/',
  asyncHandler(async function (request: Request, response: Response) {
    const users = await userService.getAll();
    response.status(200).json(users);
  }),
);

router.post(
  '/',
  asyncHandler(async function (request: Request, response: Response) {
    const newUser = await userService.create(request.body);
    response.status(200).json(newUser);
  }),
);

export default router;
