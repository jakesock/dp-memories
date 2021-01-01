import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const DB_URL = process.env.HOST || 'mongodb://localhost:27017/memories';
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('🌍 Connected to DB!'))
  .catch((err) => console.log('❌ DB CONNECTION ERROR: ', err.message));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('You found the Dinosaur Planet API!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}!`);
});
