import 'reflect-metadata';
import { Container } from 'typedi';
import { db } from '../db';
import { setupModels } from '../models';
import { DataImportService } from '../services/DataImportService';

export async function importData() {
  console.log('Importing art data...');
  const importService = Container.get(DataImportService);
  setupModels();
  await db.sync({ force: true });
  await importService.import();
  console.log('Art data imported');
}

importData();
