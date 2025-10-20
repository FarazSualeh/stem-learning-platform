# 🚀 Deployment Guide - STEM Learning Platform

This guide will help you deploy your STEM learning platform as a live application.

## 📦 Prerequisites

- Node.js (v18 or higher) - [Download](https://nodejs.org/)
- Git - [Download](https://git-scm.com/)
- A GitHub account - [Sign up](https://github.com/)
- A Supabase account - [Sign up](https://supabase.com/)
- A Vercel account - [Sign up](https://vercel.com/)

---

## 🗄️ PART 1: Set Up Supabase (Backend & Database)

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: `stem-learning-platform`
   - **Database Password**: (Choose a strong password - save it!)
   - **Region**: Choose closest to your target users
4. Click **"Create new project"** (wait 2-3 minutes for setup)

### Step 2: Set Up Database Tables

1. In your Supabase dashboard, click **"SQL Editor"** from the left sidebar
2. Click **"New Query"**
3. Copy and paste the SQL from `DATABASE_SCHEMA.sql` file
4. Click **"Run"** to execute the SQL
5. Verify tables were created: Go to **"Table Editor"** and you should see all tables

### Step 3: Enable Authentication

1. Click **"Authentication"** from the left sidebar
2. Click **"Providers"**
3. Ensure **Email** provider is enabled (it should be by default)
4. Under **"Email Auth"**, set:
   - ✅ Enable Email provider
   - ✅ Confirm email (optional - disable for testing)

### Step 4: Get Your API Keys

1. Click **"Project Settings"** (gear icon in sidebar)
2. Click **"API"** from the left menu
3. Copy and save these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

---

## 💻 PART 2: Set Up Local Development

### Step 1: Create a Local Project

Open your terminal and run:

```bash
# Create a new Vite + React + TypeScript project
npm create vite@latest stem-learning-platform -- --template react-ts

# Navigate into the project
cd stem-learning-platform

# Install dependencies
npm install
```

### Step 2: Install Required Packages

```bash
# Tailwind CSS v4
npm install tailwindcss@next @tailwindcss/vite@next

# Supabase
npm install @supabase/supabase-js

# UI Libraries
npm install lucide-react
npm install class-variance-authority clsx tailwind-merge

# Radix UI (for shadcn components)
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @radix-ui/react-slot

# Additional dependencies
npm install sonner@2.0.3 date-fns react-day-picker input-otp vaul cmdk recharts react-resizable-panels
```

### Step 3: Copy Your Code

1. Copy ALL files from this Figma Make project to your local project:
   - `/App.tsx` → `src/App.tsx`
   - `/components/` → `src/components/`
   - `/styles/globals.css` → `src/styles/globals.css`
   - `/lib/` → `src/lib/` (if exists)

2. Create `vite.config.ts` in the root:

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

3. Update `src/main.tsx`:

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

### Step 4: Set Up Environment Variables

1. Create a `.env.local` file in the root of your project:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Replace with your actual values from Supabase Step 4

3. Create `.env.example` for reference:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 5: Copy Supabase Integration Code

Copy the `lib/supabase.ts` file from this project to `src/lib/supabase.ts`

### Step 6: Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` and test:
- ✅ Sign up as a student
- ✅ Sign up as a teacher
- ✅ Login works
- ✅ Dashboard loads
- ✅ Data persists after refresh

---

## 🌐 PART 3: Deploy to Vercel (Live Website)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Create .gitignore
echo "node_modules
dist
.env.local
.DS_Store" > .gitignore

# Add all files
git add .

# Commit
git commit -m "Initial commit - STEM Learning Platform"

# Create a new repository on GitHub (github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/stem-learning-platform.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `stem-learning-platform` repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Environment Variables"** and add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **"Deploy"**
7. Wait 2-3 minutes

### Step 3: Your App is Live! 🎉

Vercel will give you a URL like: `https://stem-learning-platform.vercel.app`

---

## 🔒 PART 4: Security & Row Level Security (RLS)

### Enable RLS on All Tables

In Supabase SQL Editor, run:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_achievements ENABLE ROW LEVEL SECURITY;

-- Users can only read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Students can only read their own progress
CREATE POLICY "Students can view own progress" ON student_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own progress" ON student_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update own progress" ON student_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Teachers can view their own classes
CREATE POLICY "Teachers can view own classes" ON classes
  FOR SELECT USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can create classes" ON classes
  FOR INSERT WITH CHECK (auth.uid() = teacher_id);

-- Everyone can view activities
CREATE POLICY "Anyone can view activities" ON activities
  FOR SELECT TO authenticated USING (true);

-- Students can view and insert their own quiz results
CREATE POLICY "Students can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can insert quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## 📊 PART 5: Optional Enhancements

### Custom Domain (Optional)

1. In Vercel dashboard, click **"Settings"** → **"Domains"**
2. Add your custom domain (e.g., `stemlearning.com`)
3. Follow DNS instructions

### Email Templates

1. In Supabase, go to **"Authentication"** → **"Email Templates"**
2. Customize signup confirmation emails

### Analytics

Add Vercel Analytics:
```bash
npm install @vercel/analytics
```

In `src/main.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
```

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" or CORS errors
**Solution**: Check your Supabase URL and API keys in `.env.local`

### Issue: Login not working
**Solution**: Verify authentication is enabled in Supabase dashboard

### Issue: Data not persisting
**Solution**: Check RLS policies are set correctly

### Issue: Build fails on Vercel
**Solution**: Ensure all environment variables are added in Vercel dashboard

---

## 📞 Need Help?

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **React Docs**: [react.dev](https://react.dev)

---

## ✅ Final Checklist

- [ ] Supabase project created
- [ ] Database tables created
- [ ] Authentication enabled
- [ ] API keys copied
- [ ] Local project set up
- [ ] All packages installed
- [ ] Environment variables configured
- [ ] Code copied from Figma Make
- [ ] Tested locally (npm run dev)
- [ ] Pushed to GitHub
- [ ] Deployed on Vercel
- [ ] Environment variables added to Vercel
- [ ] RLS policies enabled
- [ ] Live site tested

**Congratulations! Your STEM Learning Platform is now LIVE! 🚀**
