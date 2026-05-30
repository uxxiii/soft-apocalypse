const express = require('express');
const router = express.Router();
const multer = require('multer');
const { submitToGoogle } = require('../services/googleService');
const { sendConfirmationEmail } = require('../services/emailService');

// Configure multer for file handling
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

/**
 * Submit form + file to Google Drive and Sheets
 */
router.post('/submit', upload.single('file'), async (req, res) => {
  try {
    // DEBUG: Log incoming data with types to help trace missing fields
    console.log('🔍 DEBUG - req.headers.content-type:', req.headers['content-type']);
    console.log('🔍 DEBUG - req.body keys:', Object.keys(req.body));
    Object.entries(req.body).forEach(([k, v]) => {
      console.log(`🔍 DEBUG - req.body[${k}] (type=${typeof v}):`, v);
    });
    console.log('🔍 DEBUG - req.file:', req.file ? { originalname: req.file.originalname, size: req.file.size } : 'NO FILE');
    
    const { name, email, city, institution, genre, title } = req.body;

    // Validate required fields (phone removed)
    if (!name || !email || !city || !institution || !genre || !title) {
      console.log('❌ VALIDATION FAILED - Missing fields:', { name: !!name, email: !!email, city: !!city, institution: !!institution, genre: !!genre, title: !!title });
      return res.status(400).json({
        error: 'Missing required fields',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'File upload is required',
      });
    }

    console.log(`📝 Receiving submission from ${name}`);

    // Get file extension
    const fileExt = req.file.originalname.split('.').pop();

    // Submit to Google
    const result = await submitToGoogle(
      {
        name,
        email,
        // phone intentionally omitted — not collecting anymore
        city,
        institution,
        genre,
        title,
        fileName: req.file.originalname,
        fileExt,
      },
      req.file.buffer,
    );

    // Send confirmation email
    try {
      await sendConfirmationEmail(email, name);
    } catch (emailError) {
      console.warn('Email not sent, but submission successful:', emailError.message);
    }

    // Return received body for debugging (temporary)
    res.json({
      ok: true,
      message: 'Thank you for submitting! We\'ve received your entry and will notify you soon.',
      fileLink: result.fileLink,
      receivedBody: req.body,
    });
  } catch (error) {
    console.error('Error in /api/submit:', error);
    res.status(500).json({
      error: error.message || 'Failed to submit to Google Sheets',
    });
  }
});

module.exports = router;
