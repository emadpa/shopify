const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    enum: ["mobile", "desktop", "tablet", "other"], // restrict values
    required: true,
  },
  sessions: {
    type: Number,
    required: true,
    min: 0,
  },
  sales: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Analytics", analyticsSchema);
