/**
 * Frontend API service for submitting to backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Submit form with file to backend
 */
export async function submitFormToBackend(formData) {
  try {
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('city', formData.city);
    formDataObj.append('institution', formData.institution);
    formDataObj.append('genre', formData.genre);
    formDataObj.append('title', formData.title);
    
    if (formData.file) {
      formDataObj.append('file', formData.file);
    }

    const response = await fetch(`${API_BASE_URL}/submit`, {
      method: 'POST',
      body: formDataObj,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit');
    }

    const data = await response.json();
    return {
      ok: true,
      message: data.message,
      fileLink: data.fileLink,
    };
  } catch (error) {
    console.error('Error submitting to backend:', error);
    throw error;
  }
}

/**
 * Send confirmation email (can be called separately if needed)
 */
export async function sendConfirmationEmail(email, name) {
  try {
    await fetch(`${API_BASE_URL}/send-confirmation-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    }).catch(() => {
      console.log('Email service not available');
    });
  } catch (error) {
    console.log('Email not sent, but submission successful');
  }
}
