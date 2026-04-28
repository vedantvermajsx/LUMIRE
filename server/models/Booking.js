const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userName: String,
  userPhone: String,
  userEmail: String,
  pieceId: String,
  pieceName: String,
  url: String,
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now },
  updatedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
