import { Dialect, Options, Sequelize } from 'sequelize';

const config: Options = {
  dialect: (process.env.DB_DIALECT || 'postgres') as Dialect,
  database: process.env.DB_NAME || 'gantri-tate',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'aceOfSPADES^^00',
};

export const db = new Sequelize(config);
