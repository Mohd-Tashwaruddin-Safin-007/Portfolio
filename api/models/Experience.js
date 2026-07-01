import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    organization: { type: String, required: true },
    location: String,
    type: { type: String, enum: ['full-time', 'part-time', 'internship', 'tutoring', 'volunteer'], default: 'full-time' },
    startDate: { type: String, required: true },
    endDate: String,
    current: { type: Boolean, default: false },
    responsibilities: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Experience', ExperienceSchema);
