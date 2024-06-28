import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// middlewares
app.use(express.json())

app.listen(Number(process.env.PORT), async () => {
  console.log("Server is up and running")
});