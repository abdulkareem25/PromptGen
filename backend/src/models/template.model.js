import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  fieldsSchema: Object,  // You can refine this later
  defaultValues: Object
});

export default mongoose.model('Template', templateSchema);
