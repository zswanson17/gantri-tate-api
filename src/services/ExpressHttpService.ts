import { Service } from 'typedi';
import express, { Express, json, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from '../routes';
import { ValidationError } from '../errors';

@Service()
export class ExpressHttpService {
  private server: Express;
  constructor(protected port: number) {
    this.server = express();
    this.setup();
    this.server.listen(this.port, () => {
      console.log(`gantri-tate-api running at: http://localhost:${port}`);
    });
  }

  private setup() {
    this.server.use(json());
    this.server.use(cors());

    this.loadRoutes();
    this.applyErrorMiddleware();
  }

  private loadRoutes() {
    for (const routePath in routes) {
      this.server.use(routePath, routes[routePath]);
    }
  }

  private applyErrorMiddleware() {
    this.server.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
      if (error instanceof ValidationError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({
        name: error.name,
        message: error.message,
      });
    });
  }
}
