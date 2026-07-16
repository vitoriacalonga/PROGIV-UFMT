import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../auth/user.entity';
import { Content } from '../contents/content.entity';
import { InitialSchema1721080000000 } from './migrations/1721080000000-InitialSchema';

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? 'miraculous',
  password: process.env.DB_PASSWORD ?? 'miraculous123',
  database: process.env.DB_DATABASE ?? 'miraculous_wiki',
  entities: [User, Content],
  migrations: [InitialSchema1721080000000],
  synchronize: false,
});
