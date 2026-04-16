const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

// Admin password from environment
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SoftApocalypse2026Admin';

// Service account credentials (same as googleService.js)
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

const auth = new google.auth.GoogleAuth({
  credentials: SERVICE_ACCOUNT,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Login endpoint
 */
router.post('/login', (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    if (password === ADMIN_PASSWORD) {
      res.json({ 
        success: true, 
        message: 'Login successful',
        token: Buffer.from(ADMIN_PASSWORD).toString('base64') // Simple token
      });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
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
    const { token } = req.query;

    // Verify token
    if (!token || Buffer.from(token, 'base64').toString() !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Fetch data from Google Sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:H',
    });

    const rows = response.data.values || [];
    
    // Skip header row and format data
    const submissions = rows.slice(1).map((row, index) => ({
      id: index + 1,
      name: row[0] || '',
      email: row[1] || '',
      city: row[2] || '',
      institution: row[3] || '',
      genre: row[4] || '',
      title: row[5] || '',
      fileLink: row[6] || '',
      submittedAt: row[7] || '',
    }));

    res.json({ 
      success: true, 
      count: submissions.length,
      submissions 
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

module.exports = router;
