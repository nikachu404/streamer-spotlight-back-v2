import mongoose from 'mongoose';

const streamerSchema = new mongoose.Schema({
  name: String,
  platform: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  image: String,
  createdAt: {type: Date, default: Date.now}
});

export const Streamer = mongoose.model('Streamer', streamerSchema, 'streamers');
