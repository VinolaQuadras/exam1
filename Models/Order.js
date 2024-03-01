const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending',
  },
  address: String,
  paymentMode: {
    type: String,
    enum: ['cash', 'card', 'UPI'],
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;