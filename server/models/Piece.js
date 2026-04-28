const mongoose = require('mongoose');

const pieceSchema = new mongoose.Schema({
  name: String,
  subtitle: String,
  category: String,
  price: String,
  material: String,
  era: String,
  stones: [String],
  description: String,
  image: String,
  images: [{
    id: String,
    preview: String,
    name: String,
    status: String,
    cloudinaryUrl: String
  }],
  tag: String,
  badge: String,
  gradient: String,
  accent: String
}, { timestamps: true });

module.exports = mongoose.model('Piece', pieceSchema);
