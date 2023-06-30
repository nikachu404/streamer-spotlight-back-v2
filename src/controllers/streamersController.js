import { Streamer } from '../models/streamer.js';

export const getStreamers = async (req, res) => {
  try {
    const streamers = await Streamer.find();

    res.status(200).json(streamers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch streamers' });
  }
};

export const getStreamer = async (req, res) => {
  try {
    const { streamerId } = req.params;

    const streamer = await Streamer.findById(streamerId);

    if (!streamer) {
      return res.status(404).json({ error: 'Streamer not found' });
    }

    res.status(200).json(streamer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch streamer' });
  }
};

export const createStreamer = async (req, res) => {
  try {
    const { name, platform, description } = req.body;

    if (!name || !platform || !description) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const newStreamer = new Streamer({
      name,
      platform,
      description,
    });

    const savedStreamer = await newStreamer.save();

    res.status(201).json(savedStreamer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save streamer submission' });
  }
};

export const voteStreamer = async (req, res) => {
  try {
    const { streamerId } = req.params;
    const { voteType } = req.body;

    const streamer = await Streamer.findById(streamerId);

    if (!streamer) {
      return res.status(404).json({ error: 'Streamer not found' });
    }

    switch (voteType) {
      case 'upvote':
        streamer.upvotes++;
        break;

      case 'downvote':
        streamer.downvotes++;
        break;

      case 'unvoteUpvote':
        if (streamer.upvotes > 0) {
          streamer.upvotes--;
        }
        break;

      case 'unvoteDownvote':
        if (streamer.downvotes > 0) {
          streamer.downvotes--;
        }
        break;

      default:
        return res.status(400).json({ error: 'Invalid vote type' });
    }

    const updatedStreamer = await streamer.save();

    res.status(200).json(updatedStreamer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vote' });
  }
};
