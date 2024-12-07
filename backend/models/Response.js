const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the form the response is for
    required: true,
    ref: 'Form',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  answers: [
    {
      question: {
        type: String, // The question text
        required: true,
      },
      type: {
        type: String, // The question type (e.g., 'text', 'checkbox', 'radio', etc.)
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed, // Flexible type to support different answers (string, array, file info)
        required: true,
      },
    },
  ],
})

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;