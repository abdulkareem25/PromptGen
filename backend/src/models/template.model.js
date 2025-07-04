const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  fieldsSchema: Object,  // You can refine this later
  defaultValues: Object
});

module.exports = mongoose.model('Template', templateSchema);
