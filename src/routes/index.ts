import { Router } from 'express';
import art from './art';
import comment from './comment';
import user from './user';

export default <
  {
    [key: string]: Router;
  }
>{
  '/': comment,
  '/api/art': art,
  '/api/users': user,
};
