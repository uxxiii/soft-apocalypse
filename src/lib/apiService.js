/**
 * Frontend API service for submitting to backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Submit article with text content to backend
 */
export async function submitFormToBackend(formData) {
  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      city: formData.city,
      institution: formData.institution,
      genre: formData.genre,
      title: formData.title,
      content: formData.content,
      ageVerified: formData.ageVerified,
    };

    console.log('📝 Submitting article payload:', {
      name: payload.name,
      email: payload.email,
      genre: payload.genre,
      title: payload.title,
      contentLength: payload.content ? payload.content.length : 0,
    });

    const response = await fetch(`${API_BASE_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit. Please check your submission guidelines.');
    }

    return {
      ok: true,
      message: data.message,
      submissionId: data.submissionId,
    };
  } catch (error) {
    console.error('Error submitting to backend:', error);
    throw error;
  }
}
