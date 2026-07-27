# Soft Apocalypse - Deployment Guide

## Overview
This project has two parts:
- **Frontend**: React/Vite app deployed to Vercel
- **Backend**: Express.js server deployed to Render.com (or Railway)
- **Storage**: Files stored on Supabase (replaces local filesystem)

---

## STEP 1: Frontend Setup for Vercel

### What to upload:
Everything in your workspace EXCEPT:
- `node_modules/` (Vercel installs automatically)
- `.env.local` (local development only)
- `vite-dev.err` and `vite-dev.log` (logs)

### Steps:
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Soft Apocalypse"
   git remote add origin https://github.com/YOUR-USERNAME/soft-apocalypse.git
   git branch -M main
   git push -u origin main
   ```

2. **Create Vercel Account:**
   - Go to https://vercel.com
   - Click "Sign up" (use GitHub)
   - Authorize GitHub access

3. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your `soft-apocalypse` repo
   - Click "Import"

4. **Configure Vercel Project:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://soft-apocalypse-api.onrender.com/api` (or your backend URL)
   - **Environments:** Production, Preview, Development

6. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - You'll get a URL like: `https://soft-apocalypse.vercel.app`

---

## STEP 2: Backend Setup (Render.com)

### What to upload:
Upload the `backend/` folder to a new GitHub repo or branch

### Steps:

1. **Create Render Account:**
   - Go to https://render.com
   - Sign up with GitHub
   - Authorize access

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your `backend` repository
   - **Name:** `soft-apocalypse-api`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free (or paid for always-on)

3. **Add Environment Variables:**
   Click "Environment" and add:

   ```
   PORT=5000
   NODE_ENV=production
   ADMIN_PASSWORD=SoftApocalypse2026Admin
   RESEND_API_KEY=re_aCg8rs59_995bPG7zefc7nsjxVoA318zo
   FRONTEND_URL=https://your-project.vercel.app
   
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

   > **Important:** For multiline private keys, replace newlines with `\n`

4. **Deploy:**
   - Click "Deploy"
   - Wait for backend to start
   - You'll get a URL like: `https://soft-apocalypse-api.onrender.com`

---

## STEP 3: Supabase Storage Setup

### What to do:
Set up cloud file storage to replace local `/uploads/`

### Steps:

1. **Create Supabase Account:**
   - Go to https://supabase.com
   - Sign up
   - Create new project (free tier is fine)

2. **Create Storage Bucket:**
   - Click "Storage" (sidebar)
   - Click "Create new bucket"
   - **Name:** `submissions`
   - **Privacy:** Public (files need to be publicly downloadable)
   - Click "Create bucket"

3. **Upload Public Policies:**
   - Click on `submissions` bucket
   - Go to "Policies" tab
   - Click "New policy" → "For full customization, use SQL editor"
   - Paste this SQL:
     ```sql
     create policy "Allow public read"
     on storage.objects
     for select
     to public
     using (bucket_id = 'submissions');

     create policy "Allow service role uploads"
     on storage.objects
     for insert
     to service_role
     with check (bucket_id = 'submissions');
     ```
   - Click "Review"
   - Click "Save policy"

4. **Get API Keys:**
   - Click "Settings" → "API"
   - Copy your:
     - **Project URL** → `SUPABASE_URL`
     - **Anon Public Key** → `SUPABASE_KEY`

---

## STEP 4: Install Supabase Package

In your `backend/` directory:

```bash
npm install @supabase/supabase-js
```

---

## STEP 5: Update Vercel with Backend URL

1. **Get your Render.com backend URL:**
   - Go to render.com → your web service
   - Copy the URL (e.g., `https://soft-apocalypse-api.onrender.com`)

2. **Update Vercel:**
   - Go to Vercel → your project → Settings → Environment Variables
   - Edit `VITE_API_URL`
   - Set value to: `https://soft-apocalypse-api.onrender.com/api`
   - Trigger a redeploy

---

## STEP 6: Final Testing

1. **Test Frontend:**
   - Visit your Vercel URL
   - Verify submission window is closed (opens Apr 18 @ 6 PM IST)
   - Check all pages load

2. **Test Submission (when window opens):**
   - Fill out form
   - Submit
   - Check admin panel: `https://your-domain.vercel.app/admin`
   - Verify file uploaded to Supabase
   - Check email inbox

3. **Troubleshooting:**
   - Check Vercel logs: Project → Deployments → click latest → Logs
   - Check Render logs: Web Service → Logs
   - Check Supabase dashboard for upload errors

---

## Files to Upload to GitHub

### Frontend Repository:
```
.
├── public/          ✅ Include
├── src/             ✅ Include
├── index.html       ✅ Include
├── package.json     ✅ Include
├── vite.config.js   ✅ Include
├── eslint.config.js ✅ Include
├── .env.local       ❌ EXCLUDE (local only)
├── node_modules/    ❌ EXCLUDE (auto-installed)
└── dist/            ❌ EXCLUDE (auto-built)
```

### Backend Repository (separate):
```
backend/
├── server.js                   ✅ Include
├── package.json               ✅ Include
├── routes/                    ✅ Include
├── services/                  ✅ Include
├── .env                       ❌ EXCLUDE (create via Render dashboard)
├── .env.production            ✅ Include (template only)
├── uploads/                   ❌ EXCLUDE (files stored on Supabase)
└── node_modules/              ❌ EXCLUDE (auto-installed)
```

---

## Environment Variables Checklist

### Vercel (Frontend):
- [ ] `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

### Render (Backend):
- [ ] `PORT` = `5000`
- [ ] `NODE_ENV` = `production`
- [ ] `ADMIN_PASSWORD` = Your secure password
- [ ] `RESEND_API_KEY` = Your Resend API key
- [ ] `SUPABASE_URL` = Your Supabase project URL
- [ ] `SUPABASE_KEY` = Your Supabase anon key
- [ ] `FRONTEND_URL` = Your Vercel frontend URL
- [ ] `GOOGLE_PRIVATE_KEY` = Your service account key

---

## Production URLs After Deployment

| Service | URL |
|---------|-----|
| **Frontend** | `https://your-project.vercel.app` |
| **Backend API** | `https://your-backend-api.onrender.com` |
| **Admin Panel** | `https://your-project.vercel.app/admin` |
| **Supabase Storage** | https://supabase.com (dashboard only) |

---

## Support & Troubleshooting

**Issue:** "Cannot POST /api/submit"
- Solution: Check `VITE_API_URL` in Vercel environment variables

**Issue:** Files not uploading
- Solution: Check Supabase credentials, verify bucket policies

**Issue:** "Submissions closed"
- Solution: Check current IST time, verify dates in `src/lib/submissionWindow.ts`

**Issue:** Admin login not working
- Solution: Verify `ADMIN_PASSWORD` matches between Render and code

---

**Your deployment is complete!** 🚀
