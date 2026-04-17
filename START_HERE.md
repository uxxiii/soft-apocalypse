## ✅ CODE CHANGES COMPLETE - READY TO DEPLOY!

### What I Changed:

#### 1. **Production Dates Set** ✅
- File: `src/lib/submissionWindow.ts`
- Changed: Submissions open **April 18 @ 6 PM IST** (was testing: April 16 @ 12 AM)
- Closing: May 15 @ 11:59 PM IST

#### 2. **Supabase File Storage Integrated** ✅
- File: `backend/services/googleService.js`
- Changed: Files now upload to Supabase instead of local `/uploads/`
- Requires: Supabase environment variables

#### 3. **Vercel Config Created** ✅
- File: `.vercel.json`
- Ready for Vercel deployment

#### 4. **Environment Templates Created** ✅
- File: `backend/.env.production`
- Shows all variables needed

#### 5. **Supabase Dependency Added** ✅
- File: `backend/package.json`
- Added: `@supabase/supabase-js`

---

## 📋 WHAT YOU NEED TO DO:

### STEP 1: Get API Keys (5 minutes)
```
1. Go to https://supabase.com → Sign up
2. Create new project (free)
3. Create storage bucket: "submissions" (set to Public)
4. Go to Settings → API
5. Copy:
   - Project URL → SUPABASE_URL
   - Anon Public Key → SUPABASE_KEY
```

### STEP 2: Push to GitHub (5 minutes)
```bash
cd d:\D\Code\Soft Apocalypse
git init
git add .
git commit -m "Deploy Soft Apocalypse"
git remote add origin https://github.com/YOUR-USERNAME/soft-apocalypse.git
git push -u origin main

# Optional: Push backend to separate repo
cd backend
git init
git add .
git commit -m "Deploy Soft Apocalypse Backend"
git remote add origin https://github.com/YOUR-USERNAME/soft-apocalypse-backend.git
git push -u origin main
```

### STEP 3: Deploy Frontend to Vercel (10 minutes)
```
1. Go to https://vercel.com → Sign up with GitHub
2. Click "Add New" → "Project"
3. Select your soft-apocalypse repo
4. Add Environment Variable:
   - VITE_API_URL = https://soft-apocalypse-api.onrender.com/api
5. Click Deploy
6. Wait for success → Copy your URL (e.g., https://soft-apocalypse.vercel.app)
```

### STEP 4: Deploy Backend to Render (10 minutes)
```
1. Go to https://render.com → Sign up with GitHub
2. Click "New +" → "Web Service"
3. Select your soft-apocalypse-backend repo
4. Set:
   - Name: soft-apocalypse-api
   - Build: npm install
   - Start: node server.js
5. Add Environment Variables (from your .env.production):
   PORT=5000
   NODE_ENV=production
   ADMIN_PASSWORD=SoftApocalypse2026Admin
   RESEND_API_KEY=re_aCg8rs59_995bPG7zefc7nsjxVoA318zo
   FRONTEND_URL=https://YOUR-VERCEL-URL.vercel.app
   SUPABASE_URL=https://YOUR-SUPABASE-URL
   SUPABASE_KEY=YOUR-SUPABASE-KEY
   GOOGLE_PRIVATE_KEY=YOUR-PRIVATE-KEY
6. Deploy → Wait for success → Copy URL
```

### STEP 5: Link Frontend & Backend (2 minutes)
```
1. Go back to Vercel
2. Settings → Environment Variables
3. Edit VITE_API_URL
4. Update to: https://YOUR-RENDER-URL.onrender.com/api
5. Deployments → Redeploy latest
```

### STEP 6: Test It! (1 minute)
```
✅ Visit your Vercel URL
✅ Check all pages load
✅ When window opens (Apr 18 @ 6 PM IST):
   - Submit a test form
   - Go to /admin → Login (SoftApocalypse2026Admin)
   - Verify submission appears
   - Download file → Should work!
```

---

## 📂 FILES CREATED FOR YOU:

| File | Purpose |
|------|---------|
| `.vercel.json` | Vercel deployment config |
| `backend/.env.production` | Template for backend environment |
| `DEPLOYMENT_GUIDE.md` | Detailed step-by-step guide |
| `QUICK_DEPLOY.md` | Checklist version |
| `THIS FILE` | Summary |

---

## 🔑 Environment Variables Reference

### In Vercel Dashboard:
```
VITE_API_URL = https://soft-apocalypse-api.onrender.com/api
```

### In Render Dashboard:
```
PORT=5000
NODE_ENV=production
ADMIN_PASSWORD=SoftApocalypse2026Admin
RESEND_API_KEY=re_aCg8rs59_995bPG7zefc7nsjxVoA318zo
FRONTEND_URL=https://YOUR-VERCEL-URL.vercel.app
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_KEY=your-anon-key
GOOGLE_PRIVATE_KEY=your-service-account-key-with-\n-escaped
```

---

## 🎯 Your Final URLs:

After deployment:
- **Frontend:** https://soft-apocalypse.vercel.app
- **Admin Panel:** https://soft-apocalypse.vercel.app/admin
- **Backend API:** https://soft-apocalypse-api.onrender.com

---

## ⏱️ Time to Deploy: ~30 minutes total

1. Get Supabase keys: 5 min
2. Push to GitHub: 5 min
3. Deploy frontend: 10 min
4. Deploy backend: 10 min
5. Test: 5 min

**Total: 35 minutes**

---

**Questions? Check `DEPLOYMENT_GUIDE.md` for detailed explanations!**

🚀 Ready to go live!
