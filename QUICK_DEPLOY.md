## DEPLOYMENT CHECKLIST - What To Do Now

### 📋 PART 1: Get Your API Keys & Credentials

#### 1. Supabase Storage (for file uploads)
- [ ] Go to https://supabase.com → Sign up with GitHub
- [ ] Create a new project (free tier)
- [ ] Go to Storage → Create new bucket called `submissions`
- [ ] Set bucket to "Public"
- [ ] Copy these to a text file:
  - Project URL (Settings → API → Project URL)
  - Anon Public Key (Settings → API → anon public)

#### 2. Resend Email API (already configured)
- [ ] Already added: `RESEND_API_KEY=re_aCg8rs59_995bPG7zefc7nsjxVoA318zo`

#### 3. Google Sheets (already configured)
- [ ] Already have: Service account credentials & Sheet ID

---

### 📁 PART 2: Prepare Files for Upload

**Frontend (upload to GitHub):**
```bash
cd d:\D\Code\Soft Apocalypse
git init
git add .
git commit -m "Initial Soft Apocalypse"
git remote add origin https://github.com/YOUR-USERNAME/soft-apocalypse.git
git push -u origin main
```

**Backend (upload to GitHub in separate repo - OPTIONAL, see Step 2):**
```bash
cd d:\D\Code\Soft Apocalypse\backend
git init
git add .
git commit -m "Initial Soft Apocalypse Backend"
git remote add origin https://github.com/YOUR-USERNAME/soft-apocalypse-backend.git
git push -u origin main
```

---

### 🚀 PART 3: Deploy Frontend to Vercel

1. Go to https://vercel.com → Sign up with GitHub
2. Click "Add New" → "Project"
3. Select your `soft-apocalypse` repo
4. Keep defaults: Framework = Vite, Build = npm run build, Output = dist
5. Click "Environment Variables" and add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://soft-apocalypse-api.onrender.com/api`
   - (We'll get this URL after Step 4)
6. Click "Deploy"
7. Wait for build → Get your Vercel URL (e.g., https://soft-apocalypse.vercel.app)

---

### 🔧 PART 4: Deploy Backend to Render.com

1. Go to https://render.com → Sign up with GitHub
2. Click "New +" → "Web Service"
3. Select your `soft-apocalypse` or `soft-apocalypse-backend` repo
4. **Fill in:**
   - Name: `soft-apocalypse-api`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Instance Type: Free (or Paid for better performance)
5. Click "Environment" and add these variables:
   ```
   PORT=5000
   NODE_ENV=production
   ADMIN_PASSWORD=SoftApocalypse2026Admin
   RESEND_API_KEY=re_aCg8rs59_995bPG7zefc7nsjxVoA318zo
   FRONTEND_URL=https://YOUR-VERCEL-URL.vercel.app
   SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   SUPABASE_KEY=YOUR-ANON-KEY-HERE
   GOOGLE_PRIVATE_KEY=YOUR-PRIVATE-KEY-WITH-ESCAPED-NEWLINES
   ```
   > ⚠️ For GOOGLE_PRIVATE_KEY: Replace all newlines with `\n` in the actual key

6. Click "Deploy"
7. Wait for build → Copy your Render URL (e.g., https://soft-apocalypse-api.onrender.com)

---

### ✅ PART 5: Update Vercel with Backend URL

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Edit `VITE_API_URL`
3. Change value to: `https://soft-apocalypse-api.onrender.com/api`
4. Click "Deployments" → Redeploy latest → Confirm

---

### 🧪 PART 6: Test Everything

**When submission window opens (April 18 @ 6 PM IST):**

1. Visit your Vercel URL (e.g., https://soft-apocalypse.vercel.app)
2. Fill out submission form
3. Click Submit
4. Check email for confirmation
5. Go to Admin Panel (`/admin`) 
6. Login with password: `SoftApocalypse2026Admin`
7. Verify submission appears in table
8. Click file download → should work

---

### 📦 What Each Folder/File Does

| File/Folder | Action | Upload? |
|---|---|---|
| `src/` | Frontend React code | ✅ YES |
| `public/` | Images, PDFs, files | ✅ YES |
| `backend/` | Express server code | ✅ YES (to separate repo) |
| `node_modules/` | Installed packages | ❌ NO (auto-installed) |
| `.env.local` | Your local secrets | ❌ NO (Vercel/Render have their own) |
| `dist/` | Built files | ❌ NO (Vercel builds it) |

---

### 🔐 Security Checklist

- [ ] Don't commit `.env.local` to GitHub
- [ ] Don't share ADMIN_PASSWORD
- [ ] Use different passwords for production
- [ ] Check Supabase bucket is "Public" for downloads
- [ ] Keep API keys in Vercel/Render dashboards (not in code)

---

### ❓ Quick FAQ

**Q: Backend deployed but "API unreachable"?**
A: Check `VITE_API_URL` in Vercel. Must be exactly: `https://your-render-url.onrender.com/api`

**Q: Files not uploading?**
A: Check Supabase bucket name is exactly `submissions` and it's set to Public

**Q: "Submissions closed" on April 18?**
A: Production dates are set. Opening: April 18 @ 6 PM IST, Closing: May 15 @ 11:59 PM IST

**Q: Admin login failing?**
A: Password is `SoftApocalypse2026Admin` - check ADMIN_PASSWORD in Render exactly matches

**Q: Need to reset everything?**
A: Delete projects from Vercel/Render and redeploy. Data stays in Google Sheets & Supabase.

---

### 📞 Support

For detailed setup instructions, see: `DEPLOYMENT_GUIDE.md`

For code changes made:
1. ✅ Production dates set (April 18 @ 6 PM IST)
2. ✅ Supabase integration added to backend
3. ✅ Vercel config created
4. ✅ Environment templates ready

**Ready to deploy!** 🎉
