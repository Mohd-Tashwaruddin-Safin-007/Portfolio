import Experience from '../models/Experience.js';

export const getExperience = async (req, res) => {
  const items = await Experience.find().sort({ order: 1, startDate: -1 }).lean();
  res.json(items);
};

export const createExperience = async (req, res) => {
  const item = await Experience.create(req.body);
  res.status(201).json(item);
};

export const updateExperience = async (req, res) => {
  const item = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: 'Experience entry not found.' });
  res.json(item);
};

export const deleteExperience = async (req, res) => {
  const item = await Experience.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Experience entry not found.' });
  res.json({ message: 'Deleted.' });
};
