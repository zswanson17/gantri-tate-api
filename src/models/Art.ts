import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { db } from '../db';

export class Art extends Model<InferAttributes<Art>, InferCreationAttributes<Art>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare artist: string;
  declare year?: number;
}

Art.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
  },
  { sequelize: db, tableName: 'art' },
);
