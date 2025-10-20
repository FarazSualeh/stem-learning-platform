# 📋 Quick Reference Card

## Essential Commands

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Git Commands
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull
```

---

## 🔑 Environment Variables

Location: `.env.local` (local) or Vercel Dashboard (production)

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ Never commit `.env.local` to Git!

---

## 🗄️ Database Access

**Supabase Dashboard:** [app.supabase.com](https://app.supabase.com)

### View Data
1. Go to "Table Editor"
2. Select a table
3. View, edit, or delete rows

### Run SQL Queries
1. Go to "SQL Editor"
2. Write your query
3. Click "Run" or press Ctrl+Enter

### Check Authentication
1. Go to "Authentication"
2. View users under "Users" tab
3. Check email templates, providers, etc.

---

## 🚀 Deployment

### Deploy to Vercel
1. Push changes to GitHub: `git push`
2. Vercel auto-deploys from `main` branch
3. Check deployment status at [vercel.com/dashboard](https://vercel.com/dashboard)

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 📊 Key Database Tables

| Table | Purpose |
|-------|---------|
| `users` | User profiles (students & teachers) |
| `student_progress` | Learning progress per subject |
| `classes` | Teacher's classes |
| `class_students` | Students enrolled in classes |
| `activities` | Available quizzes/games |
| `quiz_results` | Student quiz scores |
| `student_achievements` | Badges and awards |

---

## 🔍 Debugging

### Check Browser Console
- Press F12
- Look for red error messages
- Check Network tab for failed requests

### Check Supabase Logs
1. Go to Supabase Dashboard
2. Click "Logs" in sidebar
3. Filter by severity or search

### Check Vercel Logs
1. Go to Vercel Dashboard
2. Click your project
3. Go to "Deployments"
4. Click on a deployment
5. View build and runtime logs

---

## 🛠️ Common Tasks

### Add a New Language
1. Edit `components/LoginPage.tsx`
2. Add new language object to `translations`
3. Update `Language` type in `App.tsx`
4. Add language option in `LanguageSelector.tsx`

### Add a New Subject
1. Create new game component (e.g., `RoboticsGame.tsx`)
2. Add subject to `subjects` array in `StudentDashboard.tsx`
3. Add activities to database via SQL:
```sql
INSERT INTO activities (subject, title, description, ...)
VALUES ('robotics', 'Intro to Robotics', '...', ...);
```

### Update Styles
- Global styles: `src/styles/globals.css`
- Tailwind classes: Use in components directly
- Color themes: Update CSS variables in `globals.css`

### Add New Quiz Questions
1. Go to Supabase Table Editor
2. Open `activities` table
3. Edit the `content` JSONB field
4. Add questions in this format:
```json
{
  "questions": [
    {
      "question": "What is 2+2?",
      "options": ["3", "4", "5", "6"],
      "correct": 1
    }
  ]
}
```

---

## 📱 Testing Checklist

Before deploying:
- [ ] Test signup (student & teacher)
- [ ] Test login/logout
- [ ] Test all subject quizzes
- [ ] Test all games
- [ ] Test progress tracking
- [ ] Test on mobile device
- [ ] Test in different browsers
- [ ] Test all three languages
- [ ] Check console for errors
- [ ] Verify data persists after refresh

---

## 🔒 Security Reminders

1. ✅ Never commit `.env.local` or `.env.production`
2. ✅ Keep Supabase keys confidential
3. ✅ RLS policies must be enabled (see SETUP_INSTRUCTIONS.md Part 4)
4. ✅ Regularly update dependencies: `npm update`
5. ✅ Monitor Supabase usage to stay within free tier limits

---

## 📞 Support Resources

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **React Docs:** [react.dev](https://react.dev)
- **Tailwind Docs:** [tailwindcss.com](https://tailwindcss.com)
- **Vite Docs:** [vitejs.dev](https://vitejs.dev)

---

## 🆘 Emergency Fixes

### Site Down / Not Loading
1. Check Vercel deployment status
2. Check Supabase project is not paused
3. Verify environment variables in Vercel
4. Check domain DNS settings (if custom domain)

### Database Not Responding
1. Check Supabase project status
2. Verify RLS policies aren't blocking queries
3. Check Supabase logs for errors
4. Restart Supabase project (pause/unpause)

### Users Can't Sign Up
1. Check Authentication is enabled in Supabase
2. Verify email provider is configured
3. Check if email confirmation is required
4. Test with different email address

### Data Not Saving
1. Verify user is authenticated
2. Check RLS policies in database
3. Look for JavaScript errors in console
4. Check Supabase logs for denied queries

---

## 💡 Performance Tips

1. **Optimize Images:** Use WebP format, compress images
2. **Code Splitting:** Use React.lazy() for large components
3. **Database Indexes:** Already created in schema
4. **CDN:** Vercel automatically uses Edge Network
5. **Caching:** Enable in Vercel settings

---

## 📈 Monitoring Usage

### Supabase Dashboard
- Check "Database" → "Usage"
- Monitor API requests
- Track storage usage
- View bandwidth

### Vercel Dashboard
- View visitor analytics
- Check bandwidth usage
- Monitor function invocations
- Track build minutes

---

## 🎨 Customization Quick Guide

### Change Colors
Edit `src/styles/globals.css`:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* etc. */
}
```

### Change Logo/Branding
1. Add your logo image to `public/`
2. Update references in components
3. Change site name in `index.html`

### Change Grade Levels
1. Update `Grade` type in `App.tsx`
2. Update database schema CHECK constraint
3. Update forms in `LoginPage.tsx`

---

## 🔄 Update Workflow

When making changes:
1. Make changes locally
2. Test: `npm run dev`
3. Commit: `git commit -m "Description"`
4. Push: `git push`
5. Vercel auto-deploys
6. Verify live site

---

**Keep this file handy for quick reference! 📌**