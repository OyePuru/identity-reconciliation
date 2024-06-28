import { DataSourceOptions } from "typeorm";

const ormconfig: DataSourceOptions = {
  type: "mysql",
  host: "localhost",
  port: 33066,
  username: "root",
  password: "root",
  database: "identity-reconciliation",
  entities: ["src/**/entities/*.entity{.ts,.js}"],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: false
};

export default ormconfig;
