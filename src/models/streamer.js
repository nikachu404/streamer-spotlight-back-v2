import mongoose from 'mongoose';

const streamerSchema = new mongoose.Schema({
  name: String,
  platform: String,
  description: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

export const Streamer = mongoose.model('Streamer', streamerSchema, 'streamers');
