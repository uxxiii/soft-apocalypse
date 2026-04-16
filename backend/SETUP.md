# Soft Apocalypse Submissions - Backend Setup Guide

## 📋 Overview

The backend handles:
- ✅ File uploads to Google Drive
- ✅ Submission data to Google Sheets
- ✅ Confirmation emails to users
- ✅ Form validation and security

---

## 🚀 Quick Start

### **1. Install Dependencies**

```bash
cd backend
npm install
```

### **2. Create `.env` file**

Copy `.env.example` to `.env` and fill in:

```env
PORT=5000
NODE_ENV=development

# Google API - already configured
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Email Service (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### **3. Configure Email (Gmail)**

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Go to App Passwords
   - Select "Mail" and "Windows Computer"
   - Copy the password
   - Paste in `.env` as `EMAIL_PASSWORD`

### **4. Start Server**

```bash
npm run dev
```

Server runs at: `http://localhost:5000`

---

## 🔌 API Endpoints

### **POST /api/submit**

Submit form with file upload.

**Request (FormData):**
```javascript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('city', 'Mumbai');
formData.append('genre', 'Poetry');
formData.append('title', 'My Poem');
formData.append('file', fileObject);

fetch('http://localhost:5000/api/submit', {
  method: 'POST',
  body: formData,
});
```

**Response:**
```json
{
  "ok": true,
  "message": "Thank you for submitting! We've received your entry and will notify you soon.",
  "fileLink": "https://drive.google.com/file/d/..."
}
```

---

## ✅ Test Checklist

- [ ] Backend runs without errors
- [ ] Email service connects (no errors on startup)
- [ ] Frontend can reach backend (check browser console)
- [ ] Form submission saves to Google Sheet
- [ ] File uploads to Google Drive folder
- [ ] User receives confirmation email

---

## 🔑 Environment Variables Breakdown

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `5000` |
| `GOOGLE_PRIVATE_KEY` | Google authentication | (provided) |
| `EMAIL_USER` | Gmail address | `admin@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | (generated) |
| `FRONTEND_URL` | CORS allowlist | `http://localhost:5173` |

---

## 📁 Folder Structure

```
backend/
├── server.js              # Main Express app
├── package.json           # Dependencies
├── .env                   # Configuration (secret)
├── .env.example           # Configuration template
├── routes/
│   └── submissions.js     # Submission endpoints
└── services/
    ├── googleService.js   # Google Drive + Sheets
    └── emailService.js    # Email sending
```

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change PORT in .env to 5001, 5002, etc.
```

**Email not sending?**
- Check app password is correct
- Verify 2FA is enabled
- Check `EMAIL_USER` matches account

**Files not uploading to Drive?**
- Verify service account email is shared with folder
- Check Drive folder ID is correct

**Submissions not appearing in Sheet?**
- Verify sheet ID in googleService.js
- Check service account has edit access

---

## 🚢 Deployment

When ready for production:

1. **Deploy backend** (Heroku, Railway, Vercel, etc.)
2. **Update `FRONTEND_URL`** in .env to production URL
3. **Update frontend API URL** in `.env.local`:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

---

## 📝 Notes

- Files are stored in Google Drive, metadata in Google Sheet
- Each submission gets a unique file link
- Emails sent automatically after successful submission
- All data validated server-side

Need help? Check the errors in terminal! 🎯
