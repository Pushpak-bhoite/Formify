const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the form the response belongs to
    required: true,
    ref: 'Form', // Links to the Form schema
  },
  answers: [
    {
      question: {
        type: String, // The question text from the form
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed, // Flexible type to handle text, array, etc.
        required: true,
      },
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
