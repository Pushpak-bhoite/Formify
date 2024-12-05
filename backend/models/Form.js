const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the admin who created the form
    required: true,
    ref: 'User', // Assumes you have a User schema
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  fields: [
    {
      type: {
        type: String, // e.g., 'text', 'checkbox', 'dropdown'
        required: true,
      },
      label: {
        type: String, // e.g., 'Name', 'Hobbies'
        required: true,
      },
      options: {
        type: [String], // Only for fields like 'checkbox' or 'dropdown'
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
  ],
  formLink: {
    type: String, // The unique link for the form (e.g., `/forms/:formId`)
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
