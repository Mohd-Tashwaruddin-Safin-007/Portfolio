import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [String],
    features: [String],
    startDate: String,
    endDate: String,
    liveUrl: String,
    repoUrl: String,
    imageUrl: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);
