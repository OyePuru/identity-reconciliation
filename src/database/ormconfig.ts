import { DataSourceOptions } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

const ormconfig: DataSourceOptions = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_USER_PASSWORD,
  database: "identity-reconciliation",
  entities: ["dist/**/entities/*.entity{.ts,.js}"],
  migrations: ["dist/database/migrations/*.ts"],
  synchronize: false
};

console.log(ormconfig)

export default ormconfig;
