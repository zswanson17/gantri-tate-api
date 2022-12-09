import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import Container from 'typedi';
import { setupModels } from './models';
import { ExpressHttpService } from './services/ExpressHttpService';

export async function run() {
  setupModels();
  Container.set(ExpressHttpService, new ExpressHttpService(1717));
}

run();
