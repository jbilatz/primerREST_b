const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    userId: { type: String, required: true },
  });
  

module.exports = mongoose.model('Meeting', meetingSchema);

