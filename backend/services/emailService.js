const { Resend } = require('resend');

// Configure Resend email service
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send confirmation email to user
 */
async function sendConfirmationEmail(userEmail, userName) {
  try {
    console.log('📧 Attempting to send email to:', userEmail);
    
    const result = await resend.emails.send({
      from: 'Soft Apocalypse <onboarding@resend.dev>',
      to: userEmail,
      subject: 'Soft Apocalypse Submission Received ✨',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f7f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 12px; border: 1px solid #e0d5c7;">
            <h2 style="color: #1a2234; margin-bottom: 20px;">Thank You for Submitting! ✨</h2>
            
            <p style="color: #553333; font-size: 16px; line-height: 1.8;">
              Hi ${userName},
            </p>
            
            <p style="color: #553333; font-size: 16px; line-height: 1.8;">
              We've received your submission for <strong>Soft Apocalypse 2026</strong>. 
              Thank you for sharing your work with us!
            </p>
            
            <p style="color: #553333; font-size: 16px; line-height: 1.8;">
              Our team will review submissions carefully, and we'll notify you soon about next steps. 
              Keep an eye on your inbox for updates.
            </p>
            
            <div style="background-color: #c8a882; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="color: white; margin: 0; font-weight: bold;">
                Writing till the end of the World 🌍
              </p>
            </div>
            
            <p style="color: #553333; font-size: 14px; line-height: 1.8; margin-top: 30px;">
              Best regards,<br>
              <strong>The Soft Apocalypse Team</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0d5c7; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              © 2026 Soft Apocalypse. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log('📧 Resend Response:', result);

    if (result.error) {
      console.error('❌ Resend Error:', result.error);
      throw new Error(`Resend error: ${JSON.stringify(result.error)}`);
    }

    console.log('✅ Confirmation email sent to:', userEmail, 'ID:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('Full error:', error);
    throw error;
  }
}

module.exports = {
  sendConfirmationEmail,
};
