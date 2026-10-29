const { Resend } = require('resend');

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 'your_resend_api_key_here' || apiKey.startsWith('re_placeholder')) {
    throw new Error('Valid RESEND_API_KEY is not defined in backend/.env');
  }
  return new Resend(apiKey);
}

function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || 'Soft Apocalypse <onboarding@resend.dev>';
}

/**
 * Send confirmation email to user on submission
 */
async function sendConfirmationEmail(userEmail, userName) {
  try {
    const resend = getResendClient();
    const fromEmail = getFromEmail();
    console.log(`📧 Attempting to send confirmation email to: ${userEmail} from: ${fromEmail}`);

    const result = await resend.emails.send({
      from: fromEmail,
      to: userEmail,
      subject: 'Soft Apocalypse Submission Received ✨',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f7f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 32px; border-radius: 12px; border: 1px solid #e0d5c7;">
            <p style="text-transform: uppercase; letter-spacing: 0.25em; font-size: 11px; color: #2c4a6e; margin: 0 0 12px 0; font-weight: bold;">
              Soft Apocalypse India
            </p>
            <h2 style="color: #172234; margin: 0 0 20px 0; font-family: Georgia, serif; font-size: 24px;">Thank You for Submitting ✨</h2>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              Dear ${userName},
            </p>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              We have safely received your entry for <strong>Soft Apocalypse India</strong>. Thank you for entrusting your voice and work to our curatorial process.
            </p>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              Our editorial panel evaluates every piece anonymously and with great care. We will be in touch as soon as selections are finalized.
            </p>
            
            <div style="background-color: #f3efe9; border-left: 3px solid #c4a882; padding: 14px 18px; border-radius: 6px; margin: 24px 0;">
              <p style="color: #2c4a6e; margin: 0; font-size: 13px; font-style: italic;">
                "200 voices. One book. Writing for the next generation."
              </p>
            </div>
            
            <p style="color: #4a5568; font-size: 14px; line-height: 1.8; margin-top: 28px;">
              Warm regards,<br>
              <strong style="color: #2c4a6e;">The Soft Apocalypse Editorial Team</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e8edf2; margin: 24px 0;">
            
            <p style="color: #a0aec0; font-size: 12px; text-align: center; margin: 0;">
              © Soft Apocalypse India. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error('❌ Resend Error:', result.error);
      throw new Error(`Resend error: ${JSON.stringify(result.error)}`);
    }

    console.log('✅ Confirmation email sent to:', userEmail, 'ID:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error.message);
    throw error;
  }
}

/**
 * Send approval email to selected author
 */
async function sendApprovalEmail(userEmail, userName, articleTitle, genre) {
  try {
    const resend = getResendClient();
    const fromEmail = getFromEmail();
    console.log(`📧 Sending approval email to: ${userEmail} for "${articleTitle}" from: ${fromEmail}`);

    const result = await resend.emails.send({
      from: fromEmail,
      to: userEmail,
      subject: `Your submission "${articleTitle}" has been selected for Soft Apocalypse India 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f7f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 32px; border-radius: 12px; border: 1px solid #c4a882;">
            <p style="text-transform: uppercase; letter-spacing: 0.25em; font-size: 11px; color: #2c4a6e; margin: 0 0 12px 0; font-weight: bold;">
              Soft Apocalypse India • Official Selection
            </p>
            <h2 style="color: #172234; margin: 0 0 20px 0; font-family: Georgia, serif; font-size: 24px;">Congratulations, ${userName}! 🎉</h2>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              Dear ${userName},
            </p>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              On behalf of the editorial board and patron panel, we are delighted to inform you that your piece, <strong>"${articleTitle}"</strong> (${genre}), has been selected for publication in <strong>Soft Apocalypse India</strong>.
            </p>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              Among hundreds of entries across India, your work stood out for its clarity, resonance, and precision. We are honored to include your voice as one of the two hundred writers shaping this volume.
            </p>
            
            <div style="background-color: #eef4f9; border-left: 3px solid #2c4a6e; padding: 16px 20px; border-radius: 6px; margin: 24px 0;">
              <p style="color: #2c4a6e; margin: 0 0 6px 0; font-size: 14px; font-weight: bold;">
                What happens next?
              </p>
              <p style="color: #4a5568; margin: 0; font-size: 13px; line-height: 1.6;">
                Our editorial team will reach out with the copyediting proofs, contributor agreement, and delivery details for your complimentary author's print edition.
              </p>
            </div>
            
            <p style="color: #4a5568; font-size: 14px; line-height: 1.8; margin-top: 28px;">
              With admiration and excitement,<br>
              <strong style="color: #2c4a6e;">The Editorial Board</strong><br>
              <em>Soft Apocalypse India</em>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e8edf2; margin: 24px 0;">
            
            <p style="color: #a0aec0; font-size: 12px; text-align: center; margin: 0;">
              © Soft Apocalypse India. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error('❌ Resend Approval Error:', result.error);
      throw new Error(`Resend error: ${JSON.stringify(result.error)}`);
    }

    console.log('✅ Approval email sent to:', userEmail, 'ID:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Error sending approval email:', error.message);
    throw error;
  }
}

/**
 * Send rejection / status notification email
 */
async function sendRejectionEmail(userEmail, userName, articleTitle, genre) {
  try {
    const resend = getResendClient();
    const fromEmail = getFromEmail();
    console.log(`📧 Sending rejection update email to: ${userEmail} for "${articleTitle}" from: ${fromEmail}`);

    const result = await resend.emails.send({
      from: fromEmail,
      to: userEmail,
      subject: `Update regarding your submission to Soft Apocalypse India`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f7f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 32px; border-radius: 12px; border: 1px solid #e0d5c7;">
            <p style="text-transform: uppercase; letter-spacing: 0.25em; font-size: 11px; color: #2c4a6e; margin: 0 0 12px 0; font-weight: bold;">
              Soft Apocalypse India • Editorial Decision
            </p>
            <h2 style="color: #172234; margin: 0 0 20px 0; font-family: Georgia, serif; font-size: 22px;">Regarding Your Submission</h2>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              Dear ${userName},
            </p>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              Thank you for sharing <strong>"${articleTitle}"</strong> with us for consideration in <strong>Soft Apocalypse India</strong>.
            </p>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              Our reading panel reviewed an extraordinary volume of submissions this year. While we were deeply moved by the caliber and courage of the work submitted, we are unfortunately unable to offer a place for your piece in this specific collection.
            </p>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.8;">
              Please know that this decision reflects only the curatorial constraints and limited capacity of a single 200-voice volume, never the absolute worth or trajectory of your craft. We strongly encourage you to continue writing, revising, and sending your work out into the world.
            </p>
            
            <p style="color: #4a5568; font-size: 14px; line-height: 1.8; margin-top: 28px;">
              With gratitude and warm wishes for your writing journey,<br>
              <strong style="color: #2c4a6e;">The Soft Apocalypse Reading Committee</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e8edf2; margin: 24px 0;">
            
            <p style="color: #a0aec0; font-size: 12px; text-align: center; margin: 0;">
              © Soft Apocalypse India. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error('❌ Resend Rejection Error:', result.error);
      throw new Error(`Resend error: ${JSON.stringify(result.error)}`);
    }

    console.log('✅ Rejection email sent to:', userEmail, 'ID:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Error sending rejection email:', error.message);
    throw error;
  }
}

module.exports = {
  sendConfirmationEmail,
  sendApprovalEmail,
  sendRejectionEmail,
};
