import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema(
  {
    institution: String,
    location: String,
    degree: String,
    startDate: String,
    endDate: String,
    details: [String],
  },
  { _id: false }
);

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: String,
    photoUrl: String,
    email: { type: String, required: true },
    phone: String,
    location: String,
    bio: String,
    socials: {
      linkedin: String,
      github: String,
      twitter: String,
      website: String,
    },
    skills: {
      languages: [String],
      frameworks: [String],
      tools: [String],
      libraries: [String],
    },
    education: [EducationSchema],
    achievements: [String],
    extracurricular: [
      {
        title: String,
        organization: String,
        period: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Profile', ProfileSchema);
