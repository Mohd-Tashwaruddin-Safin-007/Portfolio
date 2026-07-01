import Profile from '../models/Profile.js';

export const getProfile = async (req, res) => {
  const profile = await Profile.findOne().lean();
  if (!profile) return res.status(404).json({ message: 'Profile not seeded yet.' });
  res.json(profile);
};

export const upsertProfile = async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true,
  });
  res.status(200).json(profile);
};
