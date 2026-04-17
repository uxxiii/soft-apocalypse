const { google } = require('googleapis');
const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase Storage Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Your service account credentials
const SERVICE_ACCOUNT = {
  type: 'service_account',
  project_id: 'soft-apocalypse',
  private_key_id: '79f48aa9c8bfb84315a441c1e9703b9af5f2451e',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC9YNlb/Z/HsN0h\n6JKZPC6rHtkLJTER5HebqejGqMExm/HLZ9lnfzKd3wkfuIipUACmKC+MWVtJwD+c\nCHfvwW61m6pjJE5ts9cQAqzwe0gjBvs5K7TG7fwKNp5LEsQdoEOeePvz9TM2N809\nHaxfJFRsZ2w1vBwb8tlrxJ35SinuqnJY1Sfghl1fX+iIsXBJ9jZp0w9aXFKvopRK\nuDyAitf2ZKYMOnI8Ktge1iEkYwzVyZP6+klzsEqVEEBf6+RkHq+qodipIBn3e85P\nTdqYIYOVA9Guz5CvdkeB8+HuwfdxcgLIL8DBAaP5MdjPVF31p8WTY71zp//n4s9R\n4JCVN1qjAgMBAAECggEAECcwow4REOFfG0NRLczaVjI9ZRv5AYOxSA/IERnX0Lly\neF0VSCSrVpftmU0OKxLt2z5WP+xnQvUo99ApGsQvA0KR1/8CyYyrbWwtAB4j2wj/\naLL3qngmJWDfQ5wIKla/Lcc4BmkFwzwjP3FGgJ8CrHRt4G95HlEqhmyw5NCUnwy5\nEKkYXacTq0TEmtDdcxy9kUT3A+fWeICQNVjeR/9G7nClr1anpzRDGC+41REVePgR\nYpIP331UgfaN9dYQDiDuiqP1ysl6vT77duoKbI9bZMVVg7tofW0g+zdYYZoxRf/2\nJx/jwD33+SBbikDDOOWyEvwYOOD5/4s5L03hhQydYQKBgQDzOTdc1FZSZ9+RMUVX\nKfEd9da0XA0Dn8COUzRLGs+ChGWBEgGaSvUzS2QUmKoTrsi8ekY+BFurVTrUkBkQ\n0v1mqaMlPPlUDf5kg2sJpJR2ZM+cZiqxgGJTrRK5DBt/PNa3hsIlJZAWmmfwXHci\nR/wLXziasMClO52Cyc/dR/7v6QKBgQDHU4qx6sg1W67gMv4s6PbeG8IW/f73Hjcr\n492JfgYfPFfMxl2GzE1CzUV9E465fk/HK4xF+5g3mXQnX+WbmGmFSoU62l7B8L0J\nibADTK4eT2dNsKaCozv1pclFyPprX7CgwL1AveUhswnPDLmguFhVg0ve2NS4h/G7\nyrIMSV4KqwKBgQCiLmDQMXZt9H2LH0ORX5I73BWSpl63L+sB/FE+U15TNV1Jt2wC\nKkFeNsNBSJsADOglZZM4/0bw9CAKZRuRsF7v+eWjiwjmF36uH0NcZrXoTEhzjVyi\nh20JRrrZUU10hmjWb7E9e9Kcf9EW4VE/NqjGHHRuEbYjd6EL+O32K2+/IQKBgQDF\nXVcrrAnpq4qQvG0pEtO+QUYBdiaLkgOXFd06UurE6v8U6CWbX5fw2UhA/KiJyyQ7\nVkdi1Ch4hR2aDz5Ovq9dJ9ib2bWR20mStB7wZXDS2lSzfIKjP/YS2cFdtA8hWnKN\n+cpq3JyQrbK8rSDwnxf4NDVfxtt6jEEzbRS3Tb4sWQKBgQCje3VRvpOaFXzgFOGf\nOUMmoa9sImh4MWrZLw+MJgYRKrfohYusmEcypKUn4BLqTIuCjGA0Y6JPfleYqHtD\n/muG6USSbhYBeuCHK5k/kPfljzO9dFrZ/gUlhIEWojsSjlqPis7tGMHFA5tpcFpy\nT8nXC8fogO3Rh7aKdhPHYixtlQ==\n-----END PRIVATE KEY-----\n',
  client_email: 'soft-apocalypse@soft-apocalypse.iam.gserviceaccount.com',
  client_id: '113257516104556221508',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/soft-apocalypse%40soft-apocalypse.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com'
};

const SHEET_ID = '1ECbdT7Ut-ziFX6H4cGrYXSgxa4kk4o-aWOpDgtajeh0';
const UPLOADS_DIR = path.join(__dirname, '../uploads');
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || 'submissions';
const SUPABASE_FOLDER = process.env.SUPABASE_FOLDER || 'submissions';
const PUBLIC_API_ORIGIN =
  process.env.PUBLIC_API_ORIGIN ||
  process.env.RENDER_EXTERNAL_URL ||
  'https://soft-apocalypse-api.onrender.com';

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Create auth client
const auth = new google.auth.GoogleAuth({
  credentials: SERVICE_ACCOUNT,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Upload file to Supabase storage
 */
async function uploadFileLocally(fileBuffer, fileName) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      throw new Error('Supabase is not configured. Missing SUPABASE_URL or SUPABASE_KEY.');
    }

    const objectPath = `${SUPABASE_FOLDER}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(objectPath, fileBuffer, {
        contentType: 'application/octet-stream',
        upsert: false
      });
    
    if (error) {
      if (error.message && error.message.toLowerCase().includes('bucket not found')) {
        throw new Error(
          `Supabase bucket not found: ${SUPABASE_BUCKET}. Create this bucket in Storage or set SUPABASE_BUCKET correctly in Render.`,
        );
      }
      throw error;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(SUPABASE_BUCKET)
      .getPublicUrl(objectPath);
    
    console.log(`✅ File uploaded to Supabase bucket '${SUPABASE_BUCKET}': ${fileName}`);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw error;
  }
}

/**
 * Append submission to Google Sheet
 */
async function appendToSheet(submissionData) {
  try {
    const normalizedFileLink = (submissionData.fileLink || '').replace(
      /^http:\/\/localhost:5000/,
      PUBLIC_API_ORIGIN,
    );

    const values = [
      [
        submissionData.name,
        submissionData.email,
        submissionData.city,
        submissionData.institution,
        submissionData.genre,
        submissionData.title,
        normalizedFileLink,
        new Date().toISOString(),
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: values,
      },
    });

    console.log(`✅ Data appended to sheet, updated range: ${response.data.updates.updatedRange}`);
    return response.data;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}

/**
 * Submit to Google Sheets with local file storage
 */
async function submitToGoogle(formData, fileBuffer) {
  try {
    let fileLink = null;

    // Upload file if present
    if (fileBuffer && formData.fileName) {
      fileLink = await uploadFileLocally(
        fileBuffer,
        `${formData.name}-${formData.genre}-${Date.now()}.${formData.fileExt}`,
      );
    }

    // Append to sheet
    const submissionData = {
      name: formData.name,
      email: formData.email,
      city: formData.city,
      institution: formData.institution,
      genre: formData.genre,
      title: formData.title,
      fileLink: fileLink,
    };

    await appendToSheet(submissionData);

    return {
      success: true,
      fileLink,
      message: 'Submission received successfully!',
    };
  } catch (error) {
    console.error('Error in submitToGoogle:', error);
    throw error;
  }
}

module.exports = {
  uploadFileLocally,
  appendToSheet,
  submitToGoogle,
};
