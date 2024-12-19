const mongoose = require('mongoose');

const taskschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskschema);