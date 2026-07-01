import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
  const message = await Message.create(req.body);
  res.status(201).json({ message: 'Message sent successfully.', id: message._id });
};

export const listMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  res.json(messages);
};
