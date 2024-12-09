const express = require('express');
const router = express.Router();
const Form = require('../models/Form'); // Assuming the Form schema is in the `models` folder
const { default: mongoose } = require('mongoose');
const Response = require('../models/Response');
const multer = require('multer');

const storage = multer.memoryStorage(); // You can choose to store files in memory or disk
const upload = multer({ storage: storage });

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
      return res.status(404).json({ success: 'Failed', error: 'Form not found' });
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

// All forms rotes
router.get(`/user-forms/:userId`, async (req, res) => {
  const { userId } = req.params;
  console.log('userId', userId)
  try {

    const id = new mongoose.Types.ObjectId(userId)
    const forms = await Form.find({ adminId: id });
    if (!forms || forms.length === 0) {
      return res.status(404).json({ success: false, error: 'No forms found for this user' });
    }
    console.log('form', forms)
    res.status(200).json({
      success: true,
      forms,
    });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
})

// Route to save a form response
// Route to submit a form response
router.post('/form-response', async (req, res) => {
  try {
    const { formId, answers } = req.body;
    console.log('req.body', req.body)
    // Validate input
    if (!formId || !answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Form ID and responses are required.' });
    }

    // Check if the form exists
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found.' });
    }

    // Create a new response document
    const newResponse = new Response({
      formId,
      answers,
    });

    // Save the response to the database
    await newResponse.save();

    res.status(201).json({
      message: 'Response submitted successfully!',
      data: newResponse,
    });
  } catch (error) {
    console.error('Error submitting response:', error);
    res.status(500).json({ error: 'An error occurred while submitting the response.' });
  }
});

// Route to get responses by form ID
router.get('/show-responses/:formId', async (req, res) => {
  const { formId } = req.params;
  try {
    const responses = await Response.find({ formId }).populate('formId');
    if (!responses || responses.length === 0) {
      return res.status(404).json({ success: false, error: 'No responses found for this form' });
    }
    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching responses for form:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// Route to delete a form by ID
router.delete('/forms/:formId', async (req, res) => {
  const { formId } = req.params;

  try {
    // Check if the form exists
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ success: false, error: 'Form not found.' });
    }

    // Delete associated responses
    await Response.deleteMany({ formId });

    // Delete the form
    await Form.findByIdAndDelete(formId);

    res.status(200).json({
      success: true,
      message: 'Form and associated responses deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});




module.exports = router;
































// router.post('/form-response', upload.any(), async (req, res) => {
//   try {
//     const { formId } = req.body;
//     console.log('formId', formId)
//     console.log('req.files', req.files)
//     // Parse answers from the request
//     const answers = JSON.parse(req.body.answers || '[]');

//     // Handle file uploads
//     req.files.forEach((file, index) => {
//       const questionIndex = file.fieldname.match(/\d+/)[0];
//       answers[questionIndex].answer = {
//         filename: file.originalname,
//         mimeType: file.mimetype,
//         buffer: file.buffer,
//       };
//     });
//     console.log('answers--->', answers)

//     // Validate input
//     if (!formId || !Array.isArray(answers) || answers.length === 0) {
//       return res.status(400).json({ error: 'Form ID and at least one answer are required.' });
//     }

//     // Create a new response document
//     const newResponse = new Response({
//       formId,
//       answers,
//     });

//     // Save the response to the database
//     await newResponse.save();

//     res.status(201).json({
//       message: 'Response saved successfully!',
//       response: newResponse,
//     });
//   } catch (error) {
//     console.error('Error saving response:', error);
//     res.status(500).json({ error: 'An error occurred while saving the response.' });
//   }
// });
