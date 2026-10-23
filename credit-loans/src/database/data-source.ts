import { CreditLoans } from '../loans/loans-entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.CREDIT_LOANS_HOST,
  username: process.env.CREDIT_LOANS_USER,
  password: process.env.CREDIT_LOANS_PASSWORD,
  database: process.env.CREDIT_LOANS_DATABASE,
  port: Number(process.env.CREDIT_LOANS_PORT),
  schema: process.env.CREDIT_LOANS_SCHEMA,
  synchronize: false,
  entities: [CreditLoans],
  logging: false,
  migrations: [__dirname + `/migrations/**/*{.ts,.js}`],
});
