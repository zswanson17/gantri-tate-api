import { Service } from 'typedi';
import fs from 'fs';
import readline from 'node:readline';
import events from 'events';
import path from 'path';
import { Art } from '../models';

@Service({})
export class DataImportService {
  private columns: { [key: number]: string } = {};

  public async import() {
    const dataFilePath = path.join(__dirname, '../../data/the-tate-collection.csv');

    const rl = readline.createInterface({
      input: fs.createReadStream(dataFilePath),
      crlfDelay: Infinity,
    });

    let lineNumber = 0;
    rl.on('line', async (line) => {
      lineNumber++;
      await this.processLine(line, lineNumber);
    });

    await events.once(rl, 'end');
  }

  private async processLine(line: string, lineNumber: number) {
    if (lineNumber === 1) {
      this.setupColumns(line);
      return;
    }

    const data = line.split(';');
    const rawArt: Record<string, string> = {};
    data.forEach((datum, i) => {
      rawArt[this.columns[i]] = datum;
    });

    if (Number.isNaN(parseInt(rawArt.year))) {
      let year = parseInt(rawArt.year.replace(/\D/g, ''));
      if (Number.isNaN(year)) {
        year = parseInt(rawArt.acquisitionYear.replace(/\D/g, ''));
        if (Number.isNaN(year)) {
          year = undefined;
        }
      }

      if (year && year.toString().length > 4) {
        year = parseInt(year.toString().substring(0, 3));
      }

      rawArt.year = year && year.toString();
    }

    try {
      await Art.create({
        id: parseInt(rawArt.id),
        title: rawArt.title,
        artist: rawArt.artist,
        year: rawArt.year ? parseInt(rawArt.year) : null,
      });
    } catch (error) {
      console.error(`Error creating art record at line ${lineNumber}`, error);
    }
  }

  private setupColumns(line: string) {
    line.split(';').forEach((columnName, i) => {
      this.columns[i] = columnName;
    });
  }
}
