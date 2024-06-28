import { DataSource, DataSourceOptions } from "typeorm";
import ormconfig from "./ormconfig";

export const AppDataSource = new DataSource({
  ...ormconfig,
  type: "mysql",
  driver: require("mysql2")
} as DataSourceOptions);
