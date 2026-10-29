const express = require('express');
const router = express.Router();
const { saveSubmission } = require('../services/supabaseService');
const { sendConfirmationEmail } = require('../services/emailService');

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countLines(text) {
  if (!text) return 0;
  return text.split('\n').filter((line) => line.trim().length > 0).length;
}

/**
 * Submit article (text format) to Supabase database
 */
router.post('/submit', async (req, res) => {
  try {
    const { name, email, city, institution, genre, title, content, ageVerified } = req.body;

    // Validate required fields
    if (!name || !email || !city || !institution || !genre || !title || !content) {
      return res.status(400).json({
        error: 'All fields (Name, Email, City, Institution, Category, Title, and Article Content) are required.',
      });
    }

    if (!ageVerified) {
      return res.status(400).json({
        error: 'You must confirm you are aged 25 or under.',
      });
    }

    const trimmedGenre = genre.trim();
    if (!['Poetry', 'Prose'].includes(trimmedGenre)) {
      return res.status(400).json({
        error: 'Category must be either Poetry or Prose.',
      });
    }

    const wordCount = countWords(content);
    const lineCount = countLines(content);

    // Validation according to specifications:
    // Poetry: 40–50 lines
    // Prose: 600–700 words
    if (trimmedGenre === 'Poetry') {
      if (lineCount < 40 || lineCount > 50) {
        return res.status(400).json({
          error: `Poetry submissions must be between 40 and 50 lines. Your poem currently has ${lineCount} lines.`,
        });
      }
    } else if (trimmedGenre === 'Prose') {
      if (wordCount < 600 || wordCount > 700) {
        return res.status(400).json({
          error: `Prose submissions must be between 600 and 700 words. Your piece currently has ${wordCount} words.`,
        });
      }
    }

    console.log(`📝 Saving submission from ${name} (${trimmedGenre} - "${title}")`);

    // Save to Supabase
    const saved = await saveSubmission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      city: city.trim(),
      institution: institution.trim(),
      genre: trimmedGenre,
      title: title.trim(),
      content: content.trim(),
      wordCount,
      lineCount,
    });

    // Send confirmation email
    try {
      await sendConfirmationEmail(email.trim(), name.trim());
    } catch (emailError) {
      console.warn('⚠️ Confirmation email could not be sent, but submission saved:', emailError.message);
    }

    res.json({
      ok: true,
      message: 'Thank you for submitting! Your work has been successfully received by Soft Apocalypse India.',
      submissionId: saved.id,
    });
  } catch (error) {
    console.error('❌ Error in /api/submit:', error);
    res.status(500).json({
      error: error.message || 'Failed to process submission',
    });
  }
});

module.exports = router;
