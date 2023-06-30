import express from 'express';
import * as streamersController from '../controllers/streamersController.js';

export const streamersRoute = express.Router();

streamersRoute.get('/', streamersController.getStreamers);
streamersRoute.get('/:streamerId', streamersController.getStreamer);
streamersRoute.post('/', streamersController.createStreamer);
streamersRoute.put('/:streamerId/vote', streamersController.voteStreamer);
