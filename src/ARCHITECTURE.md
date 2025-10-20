# 🏗️ System Architecture

Visual guide to how the STEM Learning Platform works.

---

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER DEVICES                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Desktop  │  │  Mobile  │  │  Tablet  │  │   Any    │   │
│  │ Browser  │  │ Browser  │  │ Browser  │  │ Browser  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
└───────┼─────────────┼─────────────┼─────────────┼──────────┘
        │             │             │             │
        └─────────────┴─────────────┴─────────────┘
                           │
                           ▼
        ┌─────────────────────────────────────┐
        │      VERCEL EDGE NETWORK (CDN)      │
        │  ┌───────────────────────────────┐  │
        │  │   React App (Static Files)    │  │
        │  │  - HTML, CSS, JavaScript      │  │
        │  │  - Built with Vite            │  │
        │  │  - Optimized & Cached         │  │
        │  └───────────────────────────────┘  │
        └────────────────┬────────────────────┘
                         │
                         ▼
        ┌─────────────────────────────────────┐
        │         SUPABASE BACKEND            │
        │  ┌───────────────────────────────┐  │
        │  │     Authentication Service     │  │
        │  │  - User signup/login          │  │
        │  │  - JWT tokens                 │  │
        │  │  - Session management         │  │
        │  └───────────────────────────────┘  │
        │  ┌───────────────────────────────┐  │
        │  │    PostgreSQL Database        │  │
        │  │  - 7 tables                   │  │
        │  │  - Row Level Security         │  │
        │  │  - Real-time subscriptions    │  │
        │  └───────────────────────────────┘  │
        │  ┌───────────────────────────────┐  │
        │  │       REST API / GraphQL      │  │
        │  │  - Auto-generated from schema │  │
        │  │  - Secure endpoints           │  │
        │  └───────────────────────────────┘  │
        └─────────────────────────────────────┘
```

---

## 🔄 Data Flow

### User Authentication Flow

```
1. User visits site
   ↓
2. App checks for existing session
   ├── Session exists → Load dashboard
   └── No session → Show login page
   ↓
3. User enters credentials
   ↓
4. App → Supabase Auth API
   ↓
5. Supabase validates credentials
   ├── Valid → Return JWT token
   └── Invalid → Return error
   ↓
6. App stores token in local storage
   ↓
7. User redirected to dashboard
   ↓
8. All future requests include JWT token
```

### Student Learning Flow

```
Student Login
   ↓
Dashboard Loads
   ↓
Fetches progress from database
   │
   ├─→ GET /student_progress (user_id)
   ├─→ GET /student_achievements (user_id)
   └─→ GET /activities (grade_level)
   ↓
Student selects subject
   ↓
Opens quiz or game
   ↓
Completes activity
   ↓
Submits results
   │
   ├─→ POST /quiz_results (score, answers)
   ├─→ UPDATE /student_progress (points, activities_completed)
   └─→ POST /student_achievements (if earned)
   ↓
Dashboard updates with new data
```

### Teacher Analytics Flow

```
Teacher Login
   ↓
Dashboard Loads
   ↓
Fetches classes and students
   │
   ├─→ GET /classes (teacher_id)
   ├─→ GET /class_students (class_id)
   └─→ GET /student_progress (student_ids)
   ↓
Displays aggregated analytics
   ↓
Teacher clicks on student
   ↓
Shows detailed progress
   │
   ├─→ GET /quiz_results (student_id)
   ├─→ GET /student_achievements (student_id)
   └─→ GET /student_progress (student_id)
```

---

## 🗄️ Database Schema

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id (PK)         │─┐
│ email           │ │
│ name            │ │
│ role            │ │
│ grade           │ │
│ created_at      │ │
│ updated_at      │ │
└─────────────────┘ │
                    │
    ┌───────────────┼─────────────────────────┐
    │               │                         │
    ▼               ▼                         ▼
┌────────────────┐ ┌──────────────┐ ┌─────────────────┐
│student_progress│ │   classes    │ │student_achievements│
├────────────────┤ ├──────────────┤ ├─────────────────┤
│ id (PK)        │ │ id (PK)      │ │ id (PK)         │
│ user_id (FK)   │ │ teacher_id(FK)│ │ user_id (FK)    │
│ subject        │ │ class_name   │ │ achievement_type│
│ activities_    │ │ grade        │ │ achievement_name│
│   completed    │ │ subject      │ │ achievement_icon│
│ total_activities│ │ description  │ │ subject         │
│ points         │ │ student_count│ │ earned_at       │
│ badges         │ │ created_at   │ └─────────────────┘
│ current_level  │ │ updated_at   │
│ created_at     │ └──────┬───────┘
│ updated_at     │        │
└────────────────┘        │
                          ▼
                  ┌─────────────────┐
                  │ class_students  │
                  ├─────────────────┤
                  │ id (PK)         │
                  │ class_id (FK)   │
                  │ student_id (FK) │
                  │ joined_at       │
                  └─────────────────┘

┌─────────────────┐     ┌──────────────┐
│   activities    │     │ quiz_results │
├─────────────────┤     ├──────────────┤
│ id (PK)         │─┐   │ id (PK)      │
│ subject         │ │   │ user_id (FK) │
│ title           │ │   │ activity_id  │─┘
│ description     │ │   │    (FK)      │
│ grade_level     │ │   │ score        │
│ activity_type   │ │   │ max_score    │
│ difficulty      │ │   │ time_taken   │
│ points_reward   │ │   │ answers      │
│ estimated_time  │ │   │ points_earned│
│ content (JSONB) │ │   │ completed_at │
│ created_at      │ │   └──────────────┘
│ updated_at      │ │
└─────────────────┘ │
```

---

## 🔐 Security Layers

```
┌────────────────────────────────────────────────────────┐
│                    LAYER 1: HTTPS                      │
│  All communication encrypted with TLS/SSL              │
└────────────────────────────────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────┐
│            LAYER 2: Environment Variables              │
│  API keys stored securely, never in code               │
└────────────────────────────────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────┐
│              LAYER 3: Authentication                   │
│  JWT tokens, password hashing, session management      │
└────────────────────────────────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────┐
│          LAYER 4: Row Level Security (RLS)             │
│  Database enforces access control per user             │
└────────────────────────────────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────┐
│              LAYER 5: API Rate Limiting                │
│  Prevents abuse and DDoS attacks                       │
└────────────────────────────────────────────────────────┘
```

### RLS Policies Summary

```
Users Table:
  - Users can SELECT own profile
  - Users can UPDATE own profile
  - Cannot see other users

Student Progress:
  - Students can SELECT own progress
  - Students can INSERT/UPDATE own progress
  - Teachers can SELECT their students' progress

Classes:
  - Teachers can SELECT own classes
  - Teachers can INSERT/UPDATE own classes
  - Students can SELECT classes they're in

Activities:
  - Everyone (authenticated) can SELECT
  - Only admins can INSERT/UPDATE/DELETE

Quiz Results:
  - Students can SELECT/INSERT own results
  - Teachers can SELECT results of their students
```

---

## 📦 Component Architecture

```
App.tsx (Root)
│
├─── LoginPage.tsx
│    ├── LanguageSelector.tsx
│    ├── UI Components (Button, Input, Card, etc.)
│    └── authHelpers from lib/supabase.ts
│
├─── StudentDashboard.tsx
│    ├── LanguageSelector.tsx
│    ├── SubjectQuiz.tsx
│    │    └── UI Components
│    ├── MathGame.tsx
│    ├── ScienceGame.tsx
│    ├── TechGame.tsx
│    ├── EngineeringGame.tsx
│    ├── UI Components (Progress, Card, Badge, etc.)
│    └── studentHelpers from lib/supabase.ts
│
└─── TeacherDashboard.tsx
     ├── LanguageSelector.tsx
     ├── UI Components (Table, Chart, Card, etc.)
     └── teacherHelpers from lib/supabase.ts
```

---

## 🔄 State Management

```
App.tsx State:
├── currentView: 'login' | 'dashboard'
├── userData: UserData | null
│   ├── id: string
│   ├── name: string
│   ├── email: string
│   ├── role: 'student' | 'teacher'
│   └── grade?: Grade
└── language: 'en' | 'hi' | 'od'

Props Flow:
App → LoginPage:
  - language
  - onLanguageChange
  - onLogin

App → StudentDashboard:
  - language
  - onLanguageChange
  - onLogout
  - userData

App → TeacherDashboard:
  - language
  - onLanguageChange
  - onLogout
  - userData
```

---

## 🌐 API Endpoints (Auto-generated by Supabase)

### Authentication
```
POST   /auth/v1/signup              - Create new user
POST   /auth/v1/token?grant_type=password  - Login
POST   /auth/v1/logout             - Logout
GET    /auth/v1/user               - Get current user
```

### Database (REST API)
```
GET    /rest/v1/users?id=eq.{id}          - Get user
PATCH  /rest/v1/users?id=eq.{id}          - Update user

GET    /rest/v1/student_progress?user_id=eq.{id}  - Get progress
POST   /rest/v1/student_progress                  - Create progress
PATCH  /rest/v1/student_progress?id=eq.{id}       - Update progress

GET    /rest/v1/classes?teacher_id=eq.{id}  - Get classes
POST   /rest/v1/classes                     - Create class

GET    /rest/v1/activities?grade_level=eq.{grade}  - Get activities
GET    /rest/v1/activities?subject=eq.{subject}    - Filter by subject

POST   /rest/v1/quiz_results                - Submit quiz
GET    /rest/v1/quiz_results?user_id=eq.{id}  - Get results

GET    /rest/v1/student_achievements?user_id=eq.{id}  - Get achievements
POST   /rest/v1/student_achievements                  - Award achievement
```

---

## 🔧 Technology Stack Details

### Frontend
```
React 18
├── Component Library: shadcn/ui + Radix UI
├── Styling: Tailwind CSS v4
├── Icons: Lucide React
├── Animation: Motion (Framer Motion)
├── Language: TypeScript
└── Build Tool: Vite 6

Why this stack?
✅ Modern and performant
✅ Type-safe development
✅ Great developer experience
✅ Production-ready components
✅ Fast build times
```

### Backend
```
Supabase
├── Database: PostgreSQL 15
├── Auth: GoTrue (JWT-based)
├── API: PostgREST (auto-generated)
├── Realtime: WebSockets
└── Storage: S3-compatible

Why Supabase?
✅ Full backend in minutes
✅ Built-in authentication
✅ Auto-generated APIs
✅ Generous free tier
✅ Scales to millions of users
```

### Hosting
```
Vercel
├── Edge Network: Global CDN
├── Deployment: Git-based CI/CD
├── Functions: Serverless
├── Analytics: Built-in
└── SSL: Automatic

Why Vercel?
✅ Zero-config deployment
✅ Excellent performance
✅ Free for hobby projects
✅ Perfect for React apps
✅ Automatic HTTPS
```

---

## 📊 Performance Optimizations

### Build Optimizations
```
- Code splitting (React.lazy)
- Tree shaking (Vite)
- Minification (Terser)
- Image optimization
- CSS purging (Tailwind)
- Gzip compression (Vercel)
```

### Runtime Optimizations
```
- Edge caching (Vercel CDN)
- Database indexing (PostgreSQL)
- Connection pooling (Supabase)
- Query optimization (select specific fields)
- Lazy loading components
- Memoization (React.memo, useMemo)
```

### Database Indexes
```sql
-- Already created in DATABASE_SCHEMA.sql
CREATE INDEX idx_student_progress_user_id ON student_progress(user_id);
CREATE INDEX idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX idx_activities_subject ON activities(subject);
CREATE INDEX idx_activities_grade_level ON activities(grade_level);
-- etc.
```

---

## 🔄 Deployment Pipeline

```
Developer
   ↓
Writes Code
   ↓
Commits to Git
   ↓
git push
   ↓
GitHub Repository
   ↓
Webhook triggers Vercel
   ↓
Vercel Build Server
   ├── npm install
   ├── npm run build
   └── Optimize assets
   ↓
Deploy to Edge Network
   ├── Update DNS
   ├── Invalidate cache
   └── Health check
   ↓
Live in ~2 minutes
   ↓
Users see new version
```

---

## 🎯 Scalability Plan

### Current (Free Tier)
```
Users: Up to 50,000 MAU
Database: 500 MB
Bandwidth: 2 GB/month
Performance: Excellent for thousands of users
```

### Growth Phase 1 (100K users)
```
Upgrade to Supabase Pro: $25/month
  - 100,000 MAU
  - 8 GB database
  - 50 GB bandwidth

Keep Vercel Free Tier (sufficient)
```

### Growth Phase 2 (1M users)
```
Supabase Team: $599/month
  - 1,000,000 MAU
  - Dedicated resources
  - Priority support

Vercel Pro: $20/month
  - Higher bandwidth
  - Advanced analytics
  - Preview deployments
```

### Enterprise (10M+ users)
```
Supabase Enterprise: Custom pricing
Vercel Enterprise: Custom pricing
Consider:
  - Multiple database replicas
  - CDN optimization
  - Dedicated infrastructure
  - Load balancing
```

---

## 🔍 Monitoring & Observability

### Metrics to Track
```
User Metrics:
  - Daily active users (DAU)
  - Monthly active users (MAU)
  - Signup conversion rate
  - Student engagement time
  - Quiz completion rate

Technical Metrics:
  - Page load time
  - API response time
  - Error rate
  - Database query performance
  - Bandwidth usage

Business Metrics:
  - User retention rate
  - Teacher adoption rate
  - Content engagement
  - Feature usage
  - User feedback scores
```

### Monitoring Tools
```
Supabase Dashboard:
  - Database usage
  - API requests
  - Active connections
  - Query performance
  - Error logs

Vercel Analytics:
  - Visitor count
  - Page views
  - Load time
  - Core Web Vitals
  - Geographic distribution

Browser DevTools:
  - Console errors
  - Network requests
  - Performance profiling
  - Memory usage
```

---

## 🚀 Future Enhancements

### Phase 1 (Next 3 months)
```
- [ ] Parent dashboard
- [ ] Email notifications
- [ ] Social features (leaderboards)
- [ ] More subjects (Art, Music)
- [ ] Offline mode (PWA)
```

### Phase 2 (Next 6 months)
```
- [ ] AI-powered tutoring
- [ ] Video lessons
- [ ] Live classes
- [ ] Mobile apps (iOS/Android)
- [ ] Integration with schools
```

### Phase 3 (Next 12 months)
```
- [ ] Adaptive learning paths
- [ ] Peer-to-peer learning
- [ ] Certification system
- [ ] Marketplace for teachers
- [ ] White-label solution
```

---

**This architecture is designed to be:**
- ✅ Simple to understand
- ✅ Easy to deploy
- ✅ Secure by default
- ✅ Scalable to millions
- ✅ Cost-effective
- ✅ Maintainable

Ready to deploy? Follow the `SETUP_INSTRUCTIONS.md`! 🚀