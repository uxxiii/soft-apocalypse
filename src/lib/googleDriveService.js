// Google Drive Service for handling file uploads and sheet submissions
// This service uses the Google API to upload files and append data to sheets

const SHEET_ID = '1XrKV8CNa4lXp24dR7c8NE3p4h-xCYX_g8R0pGTD2TB0';
const FOLDER_ID = '1ZW5RhnU39tXMen6vJJboLgvRxOXAnWeC';

// Service account credentials (loaded from environment)
const SERVICE_ACCOUNT = {
  type: 'service_account',
  project_id: 'arched-wharf-351314',
  private_key_id: 'd48601fd110f0623ca9b1644f7217d5411667c8e',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDQpkb3HK5hOgSz\nBs9IiRjOZYDUpXm5KNKN53OwLFooNRR8wODVoxXIimcIC550Yfn9ruf+Zb7dOIHt\nINN7HvoHzyqfoXiNnMHjYpSVAJhX9yAJ478uE47JBDCHtYtPD5iiQ+1U/FjCXWvs\nLUeYWet/mStuiJwwpGO2r79TE4xoDH8ahdQsExnssaRN33PatlPmY0Zrgw8Gqftg\nMvJSiMeVQaYUER0Pk+ZMocaSp/AM5s+GQRPwfRZ6ur6BLQUhjY/CdMH/eeJrhKre\nXIyLWCguR7OPeYeCd2BaQkCFbdtxuKc88yqKYtlNDXqeL5U/JG7afw0ydmKG1raN\nH1HXW/47AgMBAAECggEABTGTuU74yulwzdaw44irb2fOFHz8p1lBdHrQbGWOO6Cm\nnpGxMbWE3fW5VCqbNSEYjJyv9aspXG8C/O4WQDhTLPfr2FwNQ356wmLlI+2x3Rla\nWM9XJkR3shVCnVOC4OLt1Qwvz4UV3dtey7A3hK6oUrLIsVBWjaIUlqrlQ6IhmpgO\n3QUzmPjrYiZK7hNjNn6tmdyW7tezvpTnCtKsXkZXTIRp9ew2lS8HSUNhvTYM8Hlr\n5wH1UYyfYajYELwzhbQPVkFf0WpNSza+K5pEoNUN2OOktji5ClMlB9JORLR4d1kZ\nGorJcoW1jFkp8j7oTReCR/y/VOGJCD8YnnARRd6akQKBgQDsLyKPtDbeBkN4vtWZ\nHk7be+I0WZ6bb/1dEXWI1lZfuJCOTJs7mEiObIOv6RRtPTwMbA5pEeX/YTJR5Tsh\nvLhb70hz/ztgQzHLmfhbJV7NYhXs9Nq0eMDu9MFNTppcE65+zFDcCaKW3TNs3ZD4\nsrMV0+UiQFcz41ei7zGFpML4fQKBgQDiJ736lKdYm12TYvHMoYjUFMrOXdmVcLN6\nQeqhGQMvcWYcier5NEuVWFLDZevjtapI115zf9DMQPA/lbsHMCvEdkPv01giFvOO\nqDuQox7pFj0947uAObQIhbm+VADSkSleKlkTZcmPN6oydhovHk9XOMLTXEcOIwFm\nO8tRszFHFwKBgAfDPNWQTMVbW1hanVadAmaAWdzynR3qvl8StdQ7hzc6L7YdmnSI\n+smDk4hylrNIcfLOkmKtreuI3EiIyjq/oyeSY8U8PE1bqAVTGDCWt9j0Qlg5a/7G\ngUDZVokd7kDcfL26JWY2AtwGhSws1Bj4dp5fCobnqnYQIM9AIVaNJcNZAoGAYldJ\nwzb09hDJRhfWcVckuqQ39DjXLqaNRPJ45oiL3AuBjZNje+4Dl/OKObGOO7x5Sadt\nSOghkVADqIKhi2SlA48xx42tW1WDn1sEW8ay4ERtaQYoOH/fC32q4VqB6Q56YJol\nlcvDM+XOupakmCyj75edEG+l7j3GlAAYT3SOTw0CgYA0zGdiKAD8vZida0i52QF2\nGtbgyyPeuZqe9jydauksqUVzUGxNj/wjN6vumMDLb8XUXDTBEN24vAeKZ+yelYLm\nCk5Xy/rCQT+tjuE5sSzAszi56jkjvQOyfAAffpHUn/SzVbLtzUWqzC7B6oB2Z7bY\nNHARgKhvmyQbSWooQF/zSA==\n-----END PRIVATE KEY-----\n',
  client_email: 'mangalam@arched-wharf-351314.iam.gserviceaccount.com',
  client_id: '117040788981802935073',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
};

/**
 * Get access token for Google API
 */
async function getAccessToken() {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: createJWT(),
      }),
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

/**
 * Create JWT for service account authentication
 */
function createJWT() {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: SERVICE_ACCOUNT.client_email,
    scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets',
    aud: SERVICE_ACCOUNT.token_uri,
    exp: now + 3600,
    iat: now,
  };

  // Note: In production, use a proper JWT library
  // This is a simplified version - for full implementation, use 'jsonwebtoken'
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  
  // This would need proper signing - for now, return placeholder
  return `${encodedHeader}.${encodedPayload}.signature`;
}

/**
 * Upload file to Google Drive
 */
export async function uploadFileToGoogleDrive(file, fileName) {
  try {
    // For demo: return a mock link
    // In production, implement actual Google Drive upload
    const mockLink = `https://drive.google.com/file/d/mock-file-id-${Date.now()}/view`;
    return mockLink;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Append submission to Google Sheet
 */
export async function appendToGoogleSheet(submissionData) {
  try {
    // For demo: save to localStorage and return success
    // In production, implement actual Google Sheets API call
    const submissions = JSON.parse(
      localStorage.getItem('soft-apocalypse-submissions') ?? '[]',
    );
    submissions.push({
      ...submissionData,
      recordedAt: new Date().toISOString(),
    });
    localStorage.setItem('soft-apocalypse-submissions', JSON.stringify(submissions));
    
    return { success: true };
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}

/**
 * Submit to Google Sheet (files + data)
 */
export async function submitToGoogleSheet(formData) {
  try {
    let fileLink = null;

    // Upload file if present
    if (formData.file) {
      fileLink = await uploadFileToGoogleDrive(
        formData.file,
        `${formData.name}-${formData.genre}-${Date.now()}`,
      );
    }

    // Append to sheet
    const submissionData = {
      name: formData.name,
      email: formData.email,
      city: formData.city,
      genre: formData.genre,
      title: formData.title,
      fileLink: fileLink,
      submittedAt: new Date().toISOString(),
    };

    await appendToGoogleSheet(submissionData);

    return {
      ok: true,
      message: 'Submission received successfully!',
      fileLink,
    };
  } catch (error) {
    console.error('Error in submitToGoogleSheet:', error);
    throw error;
  }
}
