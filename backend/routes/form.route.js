const express = require('express');
const router = express.Router();
const Form = require('../models/Form'); // Assuming the Form schema is in the `models` folder

// Route to create a new form
router.post('/create-form', async (req, res) => {
  try {
    const { adminId, title, description, questions } = req.body;

    console.log('req.body-->', req.body)

    // Validate input
    if (!adminId || !title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Admin ID, title, and at least one field are required.' });
    }


    // Create a new form document
    const newForm = new Form({
      adminId,
      title,
      description,
      questions,
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



router.get('/forms/:formId', async (req, res) => {
  try {
    const form = await Form.findOne({ '_id': req?.params?.formId })
    if (!form) {
      return res.status(404).json({ success:'Failed', error: 'Form not found' });
    }
    console.log('form', form)
    // Save the form to the database

    res.status(200).json({
      message: 'Form fetched successfully!',
      form,
    });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

















module.exports = router;
