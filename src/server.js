import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import { streamersRoute } from './routes/streamersRoute.js';

const PORT = process.env.PORT || 3000;

const app = express();
const db = process.env.MONGODB_URL;

mongoose.connect(db);

app.use(express.json());
app.use(cors());

app.use('/streamers', streamersRoute);

app.listen(PORT);
