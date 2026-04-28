const express = require('express');
const router = express.Router();
const Piece = require('../models/Piece');

// GET /api/inventory
router.get('/', async (req, res) => {
  try {
    const pieces = await Piece.find().sort({ createdAt: -1 });
    res.json(pieces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/inventory/:id
router.get('/:id', async (req, res) => {
  try {
    const piece = await Piece.findById(req.params.id);
    if (!piece) return res.status(404).json({ error: 'Piece not found' });
    res.json(piece);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/inventory
router.post('/', async (req, res) => {
  try {
    const piece = new Piece(req.body);
    await piece.save();
    res.status(201).json(piece);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/inventory/:id
router.put('/:id', async (req, res) => {
  try {
    const piece = await Piece.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(piece);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/inventory/:id
router.delete('/:id', async (req, res) => {
  try {
    await Piece.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
