const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('Goal', goalSchema);
