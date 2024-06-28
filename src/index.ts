import express from 'express';
import * as dotenv from 'dotenv';
import "reflect-metadata"
import { AppDataSource } from './database/data.source';
import indexRouter from './router';

dotenv.config();

const app = express();

// middlewares
app.use(express.json())
app.use('/', indexRouter);

app.listen(Number(process.env.PORT), async () => {
  console.log("Server is up and running");
  AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  });
});