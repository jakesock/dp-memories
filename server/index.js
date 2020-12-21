import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

const DB_URL = process.env.HOST || 'mongodb://localhost:27017/memories';
const PORT = process.env.PORT || 8080;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('🌍 Connected to DB!'))
  .then(() =>
    app.listen(PORT, () => {
      console.log(`🚀 Listening on port ${PORT}!`);
    }),
  )
  .catch((err) => console.log('❌ DB CONNECTION ERROR: ', err.message));
