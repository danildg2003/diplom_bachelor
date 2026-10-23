import { CreditPrograms } from '../programs/programs-entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();


export default new DataSource({
  type: 'postgres',
  host: process.env.CREDIT_PROGRAMS_HOST,
  username: process.env.CREDIT_PROGRAMS_USER,
  password: process.env.CREDIT_PROGRAMS_PASSWORD,
  database: process.env.CREDIT_PROGRAMS_DATABASE,
  port: Number(process.env.CREDIT_PROGRAMS_PORT),
  schema: process.env.CREDIT_PROGRAMS_SCHEMA,
  synchronize: false,
  entities: [CreditPrograms],
  logging: false,
  migrations: [__dirname + `/migrations/**/*{.ts,.js}`],
});
