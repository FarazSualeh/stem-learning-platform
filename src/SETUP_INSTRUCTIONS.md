# 🎯 Quick Setup Instructions

Follow these step-by-step instructions to get your STEM Learning Platform live!

## ⏱️ Estimated Time: 30-45 minutes

---

## 📝 Checklist

Before you start, make sure you have accounts for:
- [ ] GitHub (for code hosting)
- [ ] Supabase (for database & authentication)
- [ ] Vercel (for hosting the website)

---

## Part 1: Set Up Your Database (10 minutes)

### 1. Create Supabase Project

1. Go to **[supabase.com](https://supabase.com)** and sign in
2. Click the **"New Project"** button
3. Fill in the details:
   ```
   Organization: (select yours)
   Project name: stem-learning-platform
   Database Password: (create a strong password - SAVE IT!)
   Region: (select closest to you)
   ```
4. Click **"Create new project"**
5. ⏳ Wait 2-3 minutes while your project is being created

### 2. Set Up Database Tables

1. In your new Supabase project, find the **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file called `DATABASE_SCHEMA.sql` from this project
4. **Copy ALL the content** from that file
5. **Paste it** into the SQL Editor
6. Click the **"Run"** button (or press Ctrl+Enter / Cmd+Enter)
7. ✅ You should see a success message!

### 3. Verify Tables Were Created

1. Click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - ✅ users
   - ✅ student_progress
   - ✅ classes
   - ✅ class_students
   - ✅ activities
   - ✅ quiz_results
   - ✅ student_achievements

If you see all these tables, you're good to go! 🎉

### 4. Get Your API Keys

1. Click the **⚙️ Settings** icon in the left sidebar
2. Click **"API"** under Project Settings
3. Find these two values and **SAVE THEM**:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (a long string of characters)

📋 **Write these down or save them in a secure note!**

---

## Part 2: Set Up Your Local Project (15 minutes)

### 1. Install Node.js (if you don't have it)

1. Go to **[nodejs.org](https://nodejs.org)**
2. Download the **LTS version** (recommended)
3. Install it
4. Open your terminal/command prompt and verify:
   ```bash
   node --version
   ```
   (Should show v18 or higher)

### 2. Create Your Project

Open your terminal and run these commands **one by one**:

```bash
# Create a new project
npm create vite@latest stem-learning-platform -- --template react-ts

# Navigate into your project
cd stem-learning-platform

# Install basic dependencies
npm install
```

### 3. Install All Required Packages

Copy this **entire block** and paste it into your terminal, then press Enter:

```bash
npm install tailwindcss@next @tailwindcss/vite@next @supabase/supabase-js lucide-react motion class-variance-authority clsx tailwind-merge @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @radix-ui/react-slot sonner@2.0.3 date-fns react-day-picker input-otp vaul cmdk recharts react-resizable-panels
```

⏳ This will take 2-3 minutes to install everything.

### 4. Copy Project Files

**From the Figma Make project**, copy these folders/files to your local project:

```
Copy from Figma Make → To your local project:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/App.tsx                  → src/App.tsx
/components/              → src/components/
/lib/                     → src/lib/
/styles/                  → src/styles/
```

### 5. Create Configuration Files

**A) Create `vite.config.ts` in your project root:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**B) Update `src/main.tsx`:**

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 6. Add Your Supabase Keys

1. Create a file called **`.env.local`** in your project root
2. Add your Supabase credentials (from Part 1, Step 4):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **Replace the placeholder values with your actual keys!**

### 7. Test Locally

Run this command:

```bash
npm run dev
```

Then open your browser to: **http://localhost:5173**

✅ **Test it:**
- Try creating a student account
- Try logging in
- Check if the dashboard loads

If everything works, you're ready to deploy! 🚀

---

## Part 3: Deploy to the Internet (10 minutes)

### 1. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Create .gitignore to protect your secrets
echo "node_modules
dist
.env.local
.DS_Store" > .gitignore

# Add all your files
git add .

# Commit
git commit -m "Initial commit - STEM Learning Platform"
```

Now **create a new repository on GitHub**:
1. Go to **[github.com/new](https://github.com/new)**
2. Name it: `stem-learning-platform`
3. Make it Public or Private (your choice)
4. **Don't** add README, .gitignore, or license (we already have them)
5. Click **"Create repository"**

Then push your code:

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/stem-learning-platform.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)**
2. Sign in with your **GitHub account**
3. Click **"Add New Project"**
4. Find and import your `stem-learning-platform` repository
5. Configure the project:
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   ```
6. **Important:** Click **"Environment Variables"**
7. Add these two variables:
   ```
   VITE_SUPABASE_URL = (paste your Supabase URL)
   VITE_SUPABASE_ANON_KEY = (paste your Supabase key)
   ```
8. Click **"Deploy"**

⏳ Wait 2-3 minutes for deployment to complete.

### 3. Your Website is Live! 🎉

Vercel will give you a URL like:
```
https://stem-learning-platform-xxx.vercel.app
```

**Share this URL with students and teachers!**

---

## Part 4: Secure Your Database (5 minutes)

⚠️ **IMPORTANT: Do this to protect user data!**

1. Go back to your **Supabase project**
2. Open the **SQL Editor**
3. Create a **"New query"**
4. Copy and paste this entire SQL code:

```sql
-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_achievements ENABLE ROW LEVEL SECURITY;

-- Security Policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Students can view own progress" ON student_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can update own progress" ON student_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own progress" ON student_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view own classes" ON classes
  FOR SELECT USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can create classes" ON classes
  FOR INSERT WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Anyone can view activities" ON activities
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Students can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can insert quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

5. Click **"Run"**
6. ✅ Done! Your database is now secure!

---

## 🎊 Congratulations!

Your STEM Learning Platform is now **LIVE** on the internet!

### What to do next:

1. ✅ **Test your live website** - Try signing up as both student and teacher
2. ✅ **Share the URL** with your target audience
3. ✅ **Monitor usage** in Supabase dashboard (Table Editor)
4. ✅ **Add more content** - Create custom quizzes and activities

### Optional Enhancements:

- Add a **custom domain** (e.g., `stemlearning.com`)
- Set up **email notifications** in Supabase
- Enable **Vercel Analytics** to track visitors
- Customize the **branding and colors**

---

## 🆘 Need Help?

### Common Issues:

**Problem: "Failed to fetch" error**
- ✅ Check your .env.local file has correct Supabase keys
- ✅ Verify environment variables are added in Vercel dashboard
- ✅ Make sure Supabase project is not paused

**Problem: Can't sign up / login**
- ✅ Check authentication is enabled in Supabase (Authentication → Providers)
- ✅ Verify database tables were created
- ✅ Check browser console for error messages

**Problem: Data not saving**
- ✅ Make sure you ran the RLS security policies (Part 4)
- ✅ Check Supabase logs (Project → Logs)

**Problem: Build fails on Vercel**
- ✅ Ensure all files were copied correctly
- ✅ Check environment variables in Vercel
- ✅ Review build logs for specific errors

### Resources:

- 📚 Full README: See `README.md` in project
- 📖 Detailed Guide: See `DEPLOYMENT_GUIDE.md`
- 💬 Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- 🚀 Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

---

## ✅ Final Checklist

- [ ] Supabase project created
- [ ] Database tables created (7 tables)
- [ ] Supabase API keys saved
- [ ] Node.js installed (v18+)
- [ ] Local project created
- [ ] All packages installed
- [ ] Project files copied
- [ ] Environment variables configured
- [ ] Tested locally (npm run dev)
- [ ] Code pushed to GitHub
- [ ] Deployed on Vercel
- [ ] Environment variables added to Vercel
- [ ] Row Level Security enabled
- [ ] Live website tested

**If all checkboxes are checked, you're done! 🎉**

---

Made with ❤️ for educators and students everywhere!