import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
  text: String,
  metadata: Object,
  usageMetrics: Object
});

export default mongoose.model('Prompt', promptSchema);
