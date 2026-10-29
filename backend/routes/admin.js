const express = require('express');
const router = express.Router();
const { getAllSubmissions, updateSubmissionStatus } = require('../services/supabaseService');
const { sendApprovalEmail, sendRejectionEmail } = require('../services/emailService');

// Admin password from environment
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SoftApocalypse2026Admin';

function verifyToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    return decoded === ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

/**
 * Admin Login
 */
router.post('/login', (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (password === ADMIN_PASSWORD) {
      return res.json({
        success: true,
        message: 'Login successful',
        token: Buffer.from(ADMIN_PASSWORD).toString('base64'),
      });
    }

    return res.status(401).json({ error: 'Invalid password' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * Get all submissions
 */
router.get('/submissions', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.query.token || (authHeader && authHeader.replace(/^Bearer\s+/, ''));

    if (!verifyToken(token)) {
      return res.status(401).json({ error: 'Unauthorized: invalid or missing token' });
    }

    const submissions = await getAllSubmissions();

    res.json({
      success: true,
      count: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch submissions' });
  }
});

/**
 * Approve or Reject a submission + send corresponding email
 */
router.post('/submissions/:id/decision', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.query.token || (authHeader && authHeader.replace(/^Bearer\s+/, ''));

    if (!verifyToken(token)) {
      return res.status(401).json({ error: 'Unauthorized: invalid or missing token' });
    }

    const { id } = req.params;
    const { status, email, name, title, genre } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Decision status must be "approved" or "rejected"' });
    }

    // Update in Supabase
    const updated = await updateSubmissionStatus(id, status);

    // Send corresponding email to author
    let emailSent = false;
    let emailError = null;

    try {
      if (status === 'approved') {
        await sendApprovalEmail(email || updated.email, name || updated.name, title || updated.title, genre || updated.genre);
      } else {
        await sendRejectionEmail(email || updated.email, name || updated.name, title || updated.title, genre || updated.genre);
      }
      emailSent = true;
    } catch (err) {
      console.warn(`⚠️ Status updated to ${status}, but notification email failed:`, err.message);
      emailError = err.message;
    }

    res.json({
      success: true,
      message: `Submission marked as ${status}${emailSent ? ' and notification email sent to author.' : ' (email sending was not completed).' }`,
      submission: updated,
      emailSent,
      emailError,
    });
  } catch (error) {
    console.error('Error in decision endpoint:', error);
    res.status(500).json({ error: error.message || 'Failed to update decision' });
  }
});

module.exports = router;
