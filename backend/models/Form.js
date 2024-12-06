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
  questions: [
    {
      type: {
        type: String, // e.g., 'text', 'checkbox', 'dropdown'
        required: true,
      },
      // label: {
      //   type: String, // e.g., 'Name', 'Hobbies'
      //   required: true,
      // },
      question:{
        type:String,
        required: true
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;