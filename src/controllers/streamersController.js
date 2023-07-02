import { Streamer } from '../models/streamer.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { generateFileName, sortQuery } from '../helpers/index.js';

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const getStreamers = async (req, res) => {
  try {
    const { currentPage, pageLimit, sortBy, sortOrder } = req.query;

    if (currentPage && pageLimit) {
      const skipCount = parseInt(currentPage, 10) - 1;
      const limitCount = parseInt(pageLimit, 10);

      if (
        isNaN(skipCount) ||
        isNaN(limitCount) ||
        skipCount < 0 ||
        limitCount <= 0
      ) {
        return res.status(400).json({ error: 'Invalid pagination parameters' });
      }

      const totalStreamers = await Streamer.countDocuments();
      const totalPages = Math.ceil(totalStreamers / limitCount);

      let query = Streamer.find();
      query = sortQuery(query, sortBy, sortOrder);

      const streamers = await query
        .skip(skipCount * limitCount)
        .limit(limitCount);

      const previousPage =
        currentPage > 1 ? parseInt(currentPage, 10) - 1 : null;
      const nextPage =
        currentPage < totalPages ? parseInt(currentPage, 10) + 1 : null;

      const paginationResult = {
        currentPage: parseInt(currentPage, 10),
        previousPage,
        nextPage,
        totalPages,
        streamers,
      };

      return res.status(200).json(paginationResult);
    }

    let query = Streamer.find();
    query = sortQuery(query, sortBy, sortOrder);

    const streamers = await query;

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
    const { buffer, mimetype } = req.file;

    if (!name || !platform || !description || !buffer || !mimetype) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const imageName = generateFileName();

    const uploadParams = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: mimetype,
    };

    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3Client.send(uploadCommand);

    const imageURL = `https://${bucketName}.s3.${region}.amazonaws.com/${imageName}`;

    const newStreamer = new Streamer({
      name,
      platform,
      description,
      image: imageURL,
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
