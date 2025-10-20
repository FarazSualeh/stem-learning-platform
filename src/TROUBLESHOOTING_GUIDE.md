# 🔧 Troubleshooting Guide

Common issues and how to fix them.

---

## 🚨 Critical Issues

### Issue: Site Not Loading / White Screen

**Symptoms:**
- Blank white page
- Nothing appears
- Console shows errors

**Solutions:**

1. **Check Browser Console**
   ```
   - Press F12
   - Click "Console" tab
   - Look for red error messages
   ```

2. **Common Causes & Fixes:**
   - **Missing Environment Variables**
     - Go to Vercel Dashboard → Project → Settings → Environment Variables
     - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
     - Redeploy after adding variables
   
   - **Build Failed**
     - Go to Vercel Dashboard → Deployments
     - Click latest deployment
     - Check build logs for errors
     - Fix errors in code and push again
   
   - **JavaScript Errors**
     - Check console for specific error
     - Fix the file mentioned in error
     - Commit and push changes

---

## 🔐 Authentication Issues

### Issue: Can't Sign Up

**Symptoms:**
- Sign up button doesn't work
- Error message appears
- Form doesn't submit

**Solutions:**

1. **Check Supabase Authentication**
   ```
   - Go to Supabase Dashboard
   - Click "Authentication" in sidebar
   - Click "Providers"
   - Ensure "Email" is enabled
   ```

2. **Check Email Confirmation Setting**
   ```
   - In Authentication → Settings
   - Check "Enable email confirmations"
   - If enabled, users must click email link first
   - Consider disabling for testing
   ```

3. **Verify Database Tables**
   ```sql
   -- Run in Supabase SQL Editor
   SELECT * FROM users LIMIT 1;
   ```
   - If error, tables weren't created
   - Re-run DATABASE_SCHEMA.sql

4. **Check Browser Console**
   - Look for specific error message
   - Common: "Failed to fetch" → Check API keys
   - Common: "User already exists" → Try different email

### Issue: Can't Login

**Symptoms:**
- "Invalid email or password" error
- Login button does nothing
- Stuck on login screen

**Solutions:**

1. **Verify Credentials**
   - Double-check email address
   - Check password (case-sensitive)
   - Try "Forgot Password" flow

2. **Check User Exists in Database**
   ```
   - Go to Supabase → Table Editor
   - Open "users" table
   - Search for the email
   - If not found, need to sign up first
   ```

3. **Check Supabase Status**
   - Go to [status.supabase.com](https://status.supabase.com)
   - Verify all systems operational

4. **Clear Browser Cache**
   ```
   - Press Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
   - Clear "Cached images and files"
   - Try logging in again
   ```

### Issue: Automatically Logged Out

**Symptoms:**
- Logged out after refresh
- Session doesn't persist
- Have to login every time

**Solutions:**

1. **Check Session Handling in App.tsx**
   - Verify `useEffect` with `checkSession` is present
   - Should run on app mount

2. **Check Supabase JWT Settings**
   ```
   - Go to Supabase → Authentication → Settings
   - Check JWT expiry time
   - Default is 1 hour, can extend to 1 week
   ```

3. **Clear Browser Storage**
   ```
   - Open DevTools (F12)
   - Go to "Application" tab
   - Clear "Local Storage"
   - Clear "Session Storage"
   - Refresh and login again
   ```

---

## 💾 Database Issues

### Issue: Data Not Saving

**Symptoms:**
- Progress doesn't save
- Quiz results disappear
- Changes don't persist

**Solutions:**

1. **Check Row Level Security**
   ```sql
   -- Run in Supabase SQL Editor
   -- See if RLS is enabled
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public';
   ```
   - If `rowsecurity` is FALSE, RLS not enabled
   - Run RLS policies from SETUP_INSTRUCTIONS.md

2. **Check User is Authenticated**
   ```javascript
   // In browser console
   const { data } = await supabase.auth.getSession();
   console.log(data.session);
   ```
   - Should show session object
   - If null, user not logged in

3. **Check Supabase Logs**
   ```
   - Go to Supabase Dashboard
   - Click "Logs" in sidebar
   - Look for failed queries
   - Check error messages
   ```

4. **Verify Table Permissions**
   - Go to Table Editor
   - Try manually inserting a row
   - If fails, check RLS policies

### Issue: Can't Read Data

**Symptoms:**
- Dashboard shows no data
- Progress is empty
- Lists don't populate

**Solutions:**

1. **Check Data Exists**
   ```sql
   -- Run in Supabase SQL Editor
   SELECT * FROM student_progress;
   SELECT * FROM activities;
   ```
   - If empty, data needs to be added
   - Re-run DATABASE_SCHEMA.sql for sample data

2. **Check User ID**
   ```javascript
   // In StudentDashboard or TeacherDashboard
   console.log(userData.id);
   ```
   - Verify ID is correct
   - Check queries use this ID

3. **Test Query Directly**
   ```javascript
   // In browser console
   const { data, error } = await supabase
     .from('student_progress')
     .select('*');
   console.log(data, error);
   ```
   - If error, check RLS policies
   - If empty, no data for this user

---

## 🌐 Deployment Issues

### Issue: Vercel Build Fails

**Symptoms:**
- Deployment shows "Failed"
- Red X on deployment
- Site doesn't update

**Solutions:**

1. **Check Build Logs**
   ```
   - Go to Vercel Dashboard
   - Click failed deployment
   - Scroll through logs
   - Find first error (often near top)
   ```

2. **Common Build Errors:**

   **"Cannot find module"**
   ```bash
   # Missing dependency
   # Add to package.json and push
   npm install <missing-package>
   git add package.json package-lock.json
   git commit -m "Add missing dependency"
   git push
   ```

   **"Type error"**
   ```typescript
   // TypeScript error in code
   // Fix the type issue mentioned
   // Common: missing import or wrong type
   ```

   **"Command failed"**
   ```bash
   # Usually npm install or build failed
   # Try locally first:
   npm run build
   # Fix errors shown, then push
   ```

3. **Verify Build Settings**
   ```
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Check Environment Variables**
   - Ensure they're set in Vercel
   - Values must NOT have quotes
   - No trailing spaces

### Issue: Vercel Site Shows Old Version

**Symptoms:**
- Changes don't appear
- Old code still running
- Updates not visible

**Solutions:**

1. **Force Redeploy**
   ```
   - Go to Vercel Dashboard
   - Click "Deployments"
   - Click "..." on latest deployment
   - Click "Redeploy"
   ```

2. **Clear CDN Cache**
   ```
   - In Vercel Dashboard
   - Go to Settings → Domains
   - Click "Purge" next to domain
   ```

3. **Hard Refresh Browser**
   ```
   - Press Ctrl+Shift+R (Cmd+Shift+R on Mac)
   - Or Ctrl+F5
   - This bypasses browser cache
   ```

---

## 🔌 Supabase Issues

### Issue: "Failed to Fetch" or CORS Error

**Symptoms:**
- Console shows network error
- "Failed to fetch"
- CORS policy error

**Solutions:**

1. **Verify Supabase URL**
   ```bash
   # Check .env.local (local) or Vercel env vars
   # Should be: https://xxxxx.supabase.co
   # NOT: https://xxxxx.supabase.co/ (no trailing slash)
   ```

2. **Check API Keys**
   ```
   - Go to Supabase → Settings → API
   - Copy fresh keys
   - Update .env.local or Vercel env vars
   - Restart dev server or redeploy
   ```

3. **Check Supabase Project Status**
   ```
   - Go to Supabase Dashboard
   - Check project isn't paused
   - Free tier projects pause after 7 days inactivity
   - Click "Restore" if paused
   ```

### Issue: Too Many Requests

**Symptoms:**
- "Rate limit exceeded"
- Slow responses
- Intermittent failures

**Solutions:**

1. **Check Usage**
   ```
   - Go to Supabase → Settings → Usage
   - Check if near limits:
     * 50,000 MAU (monthly active users)
     * 2GB egress bandwidth
     * 500MB database size
   ```

2. **Optimize Queries**
   ```typescript
   // Instead of fetching all data:
   const { data } = await supabase
     .from('activities')
     .select('*'); // ❌ Gets everything
   
   // Fetch only what you need:
   const { data } = await supabase
     .from('activities')
     .select('id, title, subject')
     .eq('grade_level', userGrade)
     .limit(10); // ✅ Optimized
   ```

3. **Upgrade Plan**
   - If consistently hitting limits
   - Consider Supabase Pro ($25/mo)
   - Much higher limits

---

## 🎨 UI/Display Issues

### Issue: Styling Broken / Ugly

**Symptoms:**
- Layout is wrong
- Colors don't work
- Buttons unstyled
- Text overlapping

**Solutions:**

1. **Check Tailwind CSS**
   ```bash
   # Verify Tailwind is installed
   npm list tailwindcss
   
   # Should show: tailwindcss@next
   # If missing:
   npm install tailwindcss@next @tailwindcss/vite@next
   ```

2. **Verify globals.css Import**
   ```typescript
   // In src/main.tsx, should have:
   import './styles/globals.css'
   ```

3. **Check vite.config.ts**
   ```typescript
   import tailwindcss from '@tailwindcss/vite'
   
   export default defineConfig({
     plugins: [react(), tailwindcss()], // ← Must include this
     // ...
   })
   ```

4. **Clear Build Cache**
   ```bash
   # Delete generated files
   rm -rf dist
   rm -rf node_modules/.vite
   
   # Rebuild
   npm run build
   ```

### Issue: Images Not Loading

**Symptoms:**
- Broken image icons
- Alt text showing instead of images
- ImageWithFallback errors

**Solutions:**

1. **Check Image Paths**
   ```typescript
   // Correct:
   <ImageWithFallback src="https://images.unsplash.com/..." />
   
   // Wrong:
   <img src="/images/photo.jpg" /> // ❌ If file doesn't exist
   ```

2. **Use Unsplash Tool**
   - All images should come from unsplash_tool
   - Don't hardcode image URLs
   - Don't use local image files (they won't deploy)

3. **Check Network Tab**
   - Open DevTools (F12)
   - Go to "Network" tab
   - Look for failed image requests (red)
   - Check the URL that's failing

---

## 📱 Mobile Issues

### Issue: Doesn't Work on Mobile

**Symptoms:**
- Layout broken on phone
- Buttons too small
- Text cut off
- Can't scroll

**Solutions:**

1. **Test Responsive Design**
   ```
   - In browser, press F12
   - Click device toggle icon (top-left)
   - Select iPhone or Android device
   - Test navigation and interaction
   ```

2. **Check Viewport Meta Tag**
   ```html
   <!-- In index.html, should have: -->
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

3. **Use Responsive Tailwind Classes**
   ```typescript
   // Wrong (fixed width):
   <div className="w-[800px]">
   
   // Right (responsive):
   <div className="w-full max-w-4xl mx-auto px-4">
   ```

---

## 🌍 Language/Translation Issues

### Issue: Translations Not Working

**Symptoms:**
- Wrong language showing
- Text in English only
- Language selector doesn't change text

**Solutions:**

1. **Check Language State**
   ```typescript
   // In App.tsx, verify:
   const [language, setLanguage] = useState<Language>('en');
   
   // State must be passed to all components
   ```

2. **Check Translation Objects**
   ```typescript
   // In each component, must have:
   const t = translations[language as keyof typeof translations];
   
   // Use like:
   <h1>{t.title}</h1>
   ```

3. **Verify All Languages Present**
   ```typescript
   const translations = {
     en: { /* English */ },
     hi: { /* Hindi */ },
     od: { /* Odia */ }
   };
   // All three must have same keys
   ```

---

## 🔍 Performance Issues

### Issue: Site is Slow

**Symptoms:**
- Pages take long to load
- Laggy interactions
- Delayed responses

**Solutions:**

1. **Check Network Speed**
   - Test on different network
   - Check Vercel status page
   - Verify Supabase isn't slow

2. **Optimize Queries**
   ```typescript
   // Don't fetch data on every render
   // Use useEffect properly:
   useEffect(() => {
     fetchData();
   }, []); // ← Empty array = run once
   ```

3. **Limit Data Fetching**
   ```typescript
   // Add pagination:
   .limit(20)
   .range(0, 19)
   ```

4. **Check Bundle Size**
   ```bash
   npm run build
   # Check dist/ folder size
   # Should be < 5MB total
   ```

---

## 🆘 Getting More Help

### Before Asking for Help:

1. ✅ Checked this troubleshooting guide
2. ✅ Looked at browser console errors
3. ✅ Checked Supabase logs
4. ✅ Reviewed Vercel deployment logs
5. ✅ Tried redeploying
6. ✅ Tested locally first

### When Asking for Help:

**Provide:**
- Exact error message (screenshot)
- Steps to reproduce
- What you've already tried
- Browser & device info
- Console errors (screenshot)
- Relevant code snippets

**Where to Ask:**
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- GitHub Issues: Create issue in your repo
- Stack Overflow: Tag with `supabase`, `vercel`, `react`

---

## 🔄 Complete Reset (Last Resort)

If nothing else works:

### Reset Local Environment
```bash
# Delete everything
rm -rf node_modules
rm -rf dist
rm -rf .next

# Reinstall
npm install

# Rebuild
npm run build

# Test
npm run dev
```

### Reset Supabase
```
1. DON'T delete project (loses data)
2. Instead, go to SQL Editor
3. Drop and recreate tables:
   DROP TABLE IF EXISTS student_achievements CASCADE;
   DROP TABLE IF EXISTS quiz_results CASCADE;
   -- etc. for all tables
4. Re-run DATABASE_SCHEMA.sql
```

### Reset Vercel
```
1. Don't delete project
2. Go to Settings → Environment Variables
3. Verify all variables correct
4. Go to Deployments
5. Redeploy latest
```

---

## 📊 Health Check Commands

Run these to verify everything is working:

### Local Development
```bash
# Check Node version (should be 18+)
node --version

# Check packages installed
npm list --depth=0

# Check for outdated packages
npm outdated

# Check for vulnerabilities
npm audit

# Test build
npm run build
```

### Database Check
```sql
-- Run in Supabase SQL Editor

-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check RLS enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check sample data
SELECT COUNT(*) FROM activities;

-- Check user count
SELECT COUNT(*) FROM users;
```

### API Check
```javascript
// Run in browser console on your site

// Check Supabase connection
const { data, error } = await supabase
  .from('activities')
  .select('count');
console.log('Connection:', error ? 'Failed' : 'Success');

// Check auth
const { data: { session } } = await supabase.auth.getSession();
console.log('Logged in:', !!session);
```

---

## ✅ Prevention Tips

Avoid issues by:

1. **Always test locally before deploying**
   ```bash
   npm run dev
   # Test thoroughly
   # Then push to GitHub
   ```

2. **Use version control properly**
   ```bash
   git status  # Check what's changed
   git diff    # Review changes
   git commit  # With good message
   ```

3. **Keep dependencies updated**
   ```bash
   npm update
   # Test after updating
   # Commit if working
   ```

4. **Monitor usage**
   - Check Supabase dashboard weekly
   - Check Vercel analytics
   - Watch for errors in logs

5. **Backup important data**
   - Export database periodically
   - Keep SQL schemas in version control
   - Document configuration changes

---

## 📞 Emergency Contacts

- **Supabase Status:** [status.supabase.com](https://status.supabase.com)
- **Vercel Status:** [www.vercel-status.com](https://www.vercel-status.com)
- **Supabase Support:** [supabase.com/support](https://supabase.com/support)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)

---

**Remember: Most issues are simple configuration problems. Stay calm, check logs, and work through the steps systematically!** 🔧