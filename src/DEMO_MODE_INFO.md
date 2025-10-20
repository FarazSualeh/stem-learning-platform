# 🎭 Demo Mode

## What is Demo Mode?

The STEM Learning Platform is currently running in **DEMO MODE** because Supabase environment variables are not configured. This is completely normal and expected in the Figma Make environment!

---

## What Works in Demo Mode

✅ **All UI and Interactions**
- Login and signup forms
- Student dashboard with all subjects
- Teacher dashboard
- Games and quizzes
- Language switching (English, Hindi, Odia)
- All animations and visual effects

✅ **Mock Authentication**
- You can "sign up" with any email and password
- You can "log in" (accepts any email with @ and password 4+ chars)
- Session management works within the current browser session

---

## What Doesn't Work in Demo Mode

❌ **Data Persistence**
- Data doesn't save to a real database
- Refresh the page = start over
- Progress and quiz results are lost

❌ **Real User Accounts**
- No actual user accounts created
- Can't log in from different devices
- No password recovery

❌ **Multi-user Features**
- Teacher can't see real student data
- Classes aren't actually created
- Analytics are simulated

---

## How to Exit Demo Mode

To get **full functionality with real data persistence**, follow these steps:

### 1. Deploy to Production

Follow the instructions in **`SETUP_INSTRUCTIONS.md`**:
1. Create Supabase account (free)
2. Run `DATABASE_SCHEMA.sql` in Supabase
3. Get your Supabase credentials
4. Set up local development environment
5. Add credentials to `.env.local`
6. Deploy to Vercel

**Time required:** 30-45 minutes
**Cost:** $0 (everything is free tier)

### 2. Quick Test Locally

If you just want to test with real database:

```bash
# 1. Create Supabase project and get credentials

# 2. Create .env.local file:
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# 3. Install dependencies
npm install

# 4. Run dev server
npm run dev
```

---

## Why Demo Mode Exists

Demo Mode allows you to:
- ✅ **Preview** the application before deploying
- ✅ **Test** all UI interactions
- ✅ **Experience** the user flow
- ✅ **Decide** if you want to deploy it
- ✅ **Show** stakeholders without setup

Think of it as a "try before you deploy" feature!

---

## Demo Mode Features

### For Testing Purposes:

**Student Demo:**
- Sign up as: student@test.com / password123
- Select grade 8
- Explore all subjects
- Take quizzes
- Play games

**Teacher Demo:**
- Sign up as: teacher@test.com / password123
- Create mock classes
- View simulated analytics

### What You'll See:

- **Orange banner** at top saying "DEMO MODE"
- **Console messages** saying "Using mock authentication"
- All features work, just without persistence

---

## Frequently Asked Questions

### Q: Is something broken?
**A:** No! Demo mode is intentional and everything is working as designed.

### Q: Can I use this for real students?
**A:** Not in demo mode. You need to deploy with Supabase for real usage.

### Q: Will my data be saved?
**A:** No, not in demo mode. Data is only in browser memory.

### Q: How do I get rid of the orange banner?
**A:** Set up Supabase and add environment variables.

### Q: Is demo mode secure?
**A:** Demo mode has no real authentication, so don't use real passwords or data.

---

## Ready to Deploy?

👉 **Start here:** [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

Or for a complete overview:
- 📘 [README.md](./README.md) - Project overview
- 📊 [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) - What's included
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - How it works

---

## Current Status

```
┌─────────────────────────────────────┐
│     STEM Learning Platform          │
│                                     │
│  Status: 🎭 DEMO MODE              │
│  Database: ❌ Not connected         │
│  Auth: ✅ Mock (for testing)        │
│  Features: ✅ All UI working        │
│  Data: ⚠️ Not persistent           │
│                                     │
│  Next Step: Deploy to production    │
│  Guide: SETUP_INSTRUCTIONS.md       │
└─────────────────────────────────────┘
```

---

**Demo mode is perfect for:**
- 👀 Previewing the application
- 🎨 Showing to stakeholders
- 🧪 Testing UI and interactions
- 📱 Checking responsive design
- 🌍 Testing language switching

**For production use with real students:**
- 🚀 Follow SETUP_INSTRUCTIONS.md
- 💾 Connect to Supabase database
- 🔐 Enable real authentication
- 📊 Get persistent data storage

---

_Happy exploring! When you're ready to deploy for real, we've got comprehensive guides ready for you._ 🚀