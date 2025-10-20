# 🚀 STEM Learning Platform

A gamified learning platform for students aged 6-12 that teaches Math, Science, Technology, and Engineering through interactive quizzes and games. Built with React, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### For Students
- 🎮 Interactive games and quizzes for all STEM subjects
- 📊 Progress tracking and analytics
- 🏆 Achievements, badges, and rewards system
- 📱 Responsive design for all devices
- 🌍 Multi-language support (English, Hindi, Odia)
- 🎯 Personalized learning based on grade level (6-12)

### For Teachers
- 👥 Class management system
- 📝 Create and assign activities
- 📈 Student progress analytics
- 📊 Detailed performance tracking
- 🔄 Real-time data synchronization

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Animation**: Motion (Framer Motion)
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Build Tool**: Vite
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed ([Download](https://nodejs.org/))
- A Supabase account ([Sign up](https://supabase.com))
- A Vercel account for deployment ([Sign up](https://vercel.com))
- Git installed ([Download](https://git-scm.com/))

## 🚀 Quick Start Guide

### Step 1: Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Name it `stem-learning-platform`
   - Choose a database password and region
   - Wait 2-3 minutes for setup

2. **Run Database Schema**
   - In Supabase dashboard, go to SQL Editor
   - Click "New Query"
   - Copy entire contents of `DATABASE_SCHEMA.sql`
   - Click "Run" to execute
   - Verify tables in "Table Editor"

3. **Get API Credentials**
   - Go to Project Settings → API
   - Copy your `Project URL`
   - Copy your `anon/public` API key

### Step 2: Set Up Local Development

1. **Create Local Project**
```bash
# Create a new Vite + React + TypeScript project
npm create vite@latest stem-learning-platform -- --template react-ts
cd stem-learning-platform

# Install dependencies
npm install
```

2. **Install Required Packages**
```bash
# Core dependencies
npm install tailwindcss@next @tailwindcss/vite@next
npm install @supabase/supabase-js
npm install lucide-react motion
npm install class-variance-authority clsx tailwind-merge

# UI Component dependencies (Radix UI)
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog
npm install @radix-ui/react-aspect-ratio @radix-ui/react-avatar
npm install @radix-ui/react-checkbox @radix-ui/react-collapsible
npm install @radix-ui/react-context-menu @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu @radix-ui/react-hover-card
npm install @radix-ui/react-label @radix-ui/react-menubar
npm install @radix-ui/react-navigation-menu @radix-ui/react-popover
npm install @radix-ui/react-progress @radix-ui/react-radio-group
npm install @radix-ui/react-scroll-area @radix-ui/react-select
npm install @radix-ui/react-separator @radix-ui/react-slider
npm install @radix-ui/react-switch @radix-ui/react-tabs
npm install @radix-ui/react-toggle @radix-ui/react-toggle-group
npm install @radix-ui/react-tooltip @radix-ui/react-slot

# Additional utilities
npm install sonner@2.0.3 date-fns react-day-picker
npm install input-otp vaul cmdk recharts react-resizable-panels
```

3. **Copy Project Files**

Copy all files from this Figma Make project to your local project:

```
src/
├── App.tsx               (from /App.tsx)
├── main.tsx              (update import paths)
├── components/           (from /components/)
├── lib/                  (from /lib/)
└── styles/               (from /styles/)
```

4. **Create vite.config.ts**
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

5. **Update src/main.tsx**
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

6. **Set Up Environment Variables**
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

7. **Test Locally**
```bash
npm run dev
```

Visit `http://localhost:5173` and test the application.

### Step 3: Deploy to Production

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/stem-learning-platform.git
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click "Deploy"
   - Your app will be live in 2-3 minutes!

### Step 4: Enable Row Level Security (Important!)

Run this SQL in Supabase SQL Editor:

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

CREATE POLICY "Students can update own progress" ON student_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Teachers can view their own classes
CREATE POLICY "Teachers can view own classes" ON classes
  FOR SELECT USING (auth.uid() = teacher_id);

-- Everyone can view activities
CREATE POLICY "Anyone can view activities" ON activities
  FOR SELECT TO authenticated USING (true);

-- Students can view and insert their own quiz results
CREATE POLICY "Students can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can insert quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 📖 Usage

### For Students

1. **Sign Up**
   - Select "Student" role
   - Choose your grade (6-12)
   - Create account with email/password

2. **Learn & Play**
   - Select a subject (Math, Science, Technology, Engineering)
   - Take quizzes or play games
   - Earn points and badges

3. **Track Progress**
   - View your learning statistics
   - Check earned achievements
   - Monitor progress across subjects

### For Teachers

1. **Sign Up**
   - Select "Teacher" role
   - Create account with email/password

2. **Manage Classes**
   - Create classes for different grades
   - Add students to classes
   - Assign activities

3. **Monitor Performance**
   - View class analytics
   - Track student progress
   - Generate reports

## 🔒 Security

- Authentication handled by Supabase Auth
- Row Level Security (RLS) policies protect user data
- Environment variables for sensitive credentials
- No API keys exposed to client

## 🌍 Internationalization

The platform supports three languages:
- **English** (en)
- **Hindi** (hi)
- **Odia** (od)

Switch languages using the language selector in the navigation bar.

## 📁 Project Structure

```
stem-learning-platform/
├── src/
│   ├── App.tsx                    # Main app component with routing
│   ├── main.tsx                   # Entry point
│   ├── components/
│   │   ├── LoginPage.tsx          # Authentication UI
│   │   ├── StudentDashboard.tsx   # Student interface
│   │   ├── TeacherDashboard.tsx   # Teacher interface
│   │   ├── LanguageSelector.tsx   # Language switcher
│   │   ├── SubjectQuiz.tsx        # Quiz component
│   │   ├── *Game.tsx              # Game components
│   │   └── ui/                    # shadcn/ui components
│   ├── lib/
│   │   └── supabase.ts            # Supabase client & helpers
│   └── styles/
│       └── globals.css            # Global styles & Tailwind
├── DATABASE_SCHEMA.sql            # Database setup script
├── DEPLOYMENT_GUIDE.md            # Detailed deployment guide
├── .env.example                   # Environment variables template
├── vite.config.ts                 # Vite configuration
└── package.json                   # Dependencies
```

## 🐛 Troubleshooting

### Issue: "Failed to fetch" or CORS errors
**Solution**: Verify your Supabase URL and API keys in `.env.local`

### Issue: Login not working
**Solution**: 
- Check authentication is enabled in Supabase dashboard
- Verify database tables were created correctly
- Check browser console for error messages

### Issue: Data not persisting
**Solution**: 
- Ensure RLS policies are correctly configured
- Verify user is authenticated
- Check Supabase logs for errors

### Issue: Build fails on Vercel
**Solution**: 
- Ensure all environment variables are added in Vercel dashboard
- Check that all dependencies are in package.json
- Review build logs for specific errors

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## ⚠️ Important Notes

- This platform is designed for educational purposes
- Not intended for collecting PII or sensitive data
- Always follow data privacy regulations (COPPA, GDPR, etc.)
- Secure environment variables and never commit them to version control

## 🎉 Next Steps

After deployment, consider adding:

- ✅ Custom domain name
- ✅ Email notifications for achievements
- ✅ Analytics with Vercel Analytics
- ✅ More subjects and activities
- ✅ Parent dashboard
- ✅ Social features (leaderboards)
- ✅ Mobile app version

## 📞 Support

For help or questions:
- Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions
- Review Supabase and Vercel documentation
- Check existing issues on GitHub

---

**Built with ❤️ for young learners everywhere** 🚀