import { SequelizeModuleOptions } from '@nestjs/sequelize';
import dotenv from 'dotenv'

dotenv.config()

export const DatabaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
};
