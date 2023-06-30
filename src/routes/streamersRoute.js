import express from 'express';
import multer from 'multer';
import * as streamersController from '../controllers/streamersController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const streamersRoute = express.Router();

streamersRoute.get('/', streamersController.getStreamers);
streamersRoute.get('/:streamerId', streamersController.getStreamer);
streamersRoute.post('/', upload.single('image'), streamersController.createStreamer);
streamersRoute.put('/:streamerId/vote', streamersController.voteStreamer);
