const express = require('express');
const router = express.Router();
const Template = require('../models/template.model');

// GET all templates
router.get('/', async (req, res) => {
  const templates = await Template.find();
  res.json(templates);
});

// GET single template
router.get('/:id', async (req, res) => {
  const template = await Template.findById(req.params.id);
  if (!template) return res.status(404).json({ msg: 'Not found' });
  res.json(template);
});

// CREATE template
router.post('/', async (req, res) => {
  const template = new Template(req.body);
  await template.save();
  res.status(201).json(template);
});

// UPDATE template
router.put('/:id', async (req, res) => {
  const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(template);
});

// DELETE template
router.delete('/:id', async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
