const express = require('express');
const router = express.Router();
const Form = require('../models/Form'); // Assuming the Form schema is in the `models` folder
// const { v4: uuidv4 } = require('uuid'); // For generating unique form links

// Route to create a new form
router.post('/create-form', async (req, res) => {
  try {
    const { adminId, title, description, fields } = req.body;

    console.log('req.body-->', req.body)

    // Validate input
    if (!adminId || !title || !fields || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({ error: 'Admin ID, title, and at least one field are required.' });
    }

    // Generate a unique form link
    const formLink = `/forms/${adminId()}`;

    // Create a new form document
    const newForm = new Form({
      adminId,
      title,
      description,
      fields,
      formLink,
    });

    // Save the form to the database
    await newForm.save();

    res.status(201).json({
      message: 'Form created successfully!',
      form: newForm,
    });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ error: 'An error occurred while creating the form.' });
  }
});

module.exports = router;
