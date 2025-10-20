-- ============================================
-- STEM Learning Platform - Database Schema
-- ============================================
-- This SQL script creates all necessary tables for the STEM learning platform
-- Run this in your Supabase SQL Editor after creating your project

-- ============================================
-- 1. USERS TABLE
-- ============================================
-- Extends Supabase auth.users with additional profile information
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher')),
  grade TEXT CHECK (grade IN ('6', '7', '8', '9', '10', '11', '12')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. STUDENT PROGRESS TABLE
-- ============================================
-- Tracks student progress across different subjects
CREATE TABLE IF NOT EXISTS public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL CHECK (subject IN ('mathematics', 'science', 'technology', 'engineering')),
  activities_completed INTEGER DEFAULT 0,
  total_activities INTEGER DEFAULT 10,
  points INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  current_level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, subject)
);

-- ============================================
-- 3. CLASSES TABLE
-- ============================================
-- Teachers can create and manage classes
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  class_name TEXT NOT NULL,
  grade TEXT NOT NULL CHECK (grade IN ('6', '7', '8', '9', '10', '11', '12')),
  subject TEXT CHECK (subject IN ('mathematics', 'science', 'technology', 'engineering', 'all')),
  description TEXT,
  student_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. CLASS STUDENTS TABLE
-- ============================================
-- Links students to classes (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.class_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(class_id, student_id)
);

-- ============================================
-- 5. ACTIVITIES TABLE
-- ============================================
-- Stores available learning activities and quizzes
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL CHECK (subject IN ('mathematics', 'science', 'technology', 'engineering')),
  title TEXT NOT NULL,
  description TEXT,
  grade_level TEXT NOT NULL CHECK (grade_level IN ('6', '7', '8', '9', '10', '11', '12')),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('quiz', 'game', 'challenge', 'experiment')),
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points_reward INTEGER DEFAULT 10,
  estimated_time_minutes INTEGER,
  content JSONB, -- Stores quiz questions, game config, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. QUIZ RESULTS TABLE
-- ============================================
-- Stores student quiz and activity results
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  time_taken_seconds INTEGER,
  answers JSONB, -- Stores detailed answers
  points_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. STUDENT ACHIEVEMENTS TABLE
-- ============================================
-- Tracks badges, awards, and achievements
CREATE TABLE IF NOT EXISTS public.student_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL CHECK (achievement_type IN ('badge', 'trophy', 'certificate', 'streak')),
  achievement_name TEXT NOT NULL,
  achievement_icon TEXT, -- Icon name or URL
  subject TEXT CHECK (subject IN ('mathematics', 'science', 'technology', 'engineering', 'all')),
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_name)
);

-- ============================================
-- INDEXES for better query performance
-- ============================================
CREATE INDEX idx_student_progress_user_id ON public.student_progress(user_id);
CREATE INDEX idx_student_progress_subject ON public.student_progress(subject);
CREATE INDEX idx_classes_teacher_id ON public.classes(teacher_id);
CREATE INDEX idx_class_students_class_id ON public.class_students(class_id);
CREATE INDEX idx_class_students_student_id ON public.class_students(student_id);
CREATE INDEX idx_activities_subject ON public.activities(subject);
CREATE INDEX idx_activities_grade_level ON public.activities(grade_level);
CREATE INDEX idx_quiz_results_user_id ON public.quiz_results(user_id);
CREATE INDEX idx_quiz_results_activity_id ON public.quiz_results(activity_id);
CREATE INDEX idx_achievements_user_id ON public.student_achievements(user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON public.student_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to initialize student progress when new student signs up
CREATE OR REPLACE FUNCTION initialize_student_progress()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'student' THEN
    -- Create progress entries for all subjects
    INSERT INTO public.student_progress (user_id, subject, activities_completed, total_activities, points)
    VALUES 
      (NEW.id, 'mathematics', 0, 10, 0),
      (NEW.id, 'science', 0, 10, 0),
      (NEW.id, 'technology', 0, 10, 0),
      (NEW.id, 'engineering', 0, 10, 0);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create student progress on user creation
CREATE TRIGGER on_user_created_init_progress
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_student_progress();

-- Function to update class student count
CREATE OR REPLACE FUNCTION update_class_student_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.classes 
    SET student_count = student_count + 1 
    WHERE id = NEW.class_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.classes 
    SET student_count = student_count - 1 
    WHERE id = OLD.class_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to maintain student count in classes
CREATE TRIGGER update_class_count_on_student_join
  AFTER INSERT ON public.class_students
  FOR EACH ROW
  EXECUTE FUNCTION update_class_student_count();

CREATE TRIGGER update_class_count_on_student_leave
  AFTER DELETE ON public.class_students
  FOR EACH ROW
  EXECUTE FUNCTION update_class_student_count();

-- ============================================
-- SEED DATA - Sample Activities
-- ============================================
-- Insert some sample activities for testing

INSERT INTO public.activities (subject, title, description, grade_level, activity_type, difficulty, points_reward, estimated_time_minutes, content)
VALUES 
  -- Mathematics Activities
  ('mathematics', 'Basic Algebra Quiz', 'Test your knowledge of basic algebraic equations', '6', 'quiz', 'easy', 10, 15, 
   '{"questions": [{"question": "What is x in: x + 5 = 10?", "options": ["3", "5", "10", "15"], "correct": 1}]}'::jsonb),
  
  ('mathematics', 'Geometry Challenge', 'Identify shapes and calculate areas', '7', 'challenge', 'medium', 20, 20,
   '{"questions": [{"question": "What is the area of a rectangle with length 5 and width 3?", "options": ["8", "15", "20", "25"], "correct": 1}]}'::jsonb),
  
  ('mathematics', 'Advanced Calculus', 'Solve derivative problems', '12', 'quiz', 'hard', 30, 30,
   '{"questions": [{"question": "What is the derivative of x²?", "options": ["x", "2x", "x²", "2x²"], "correct": 1}]}'::jsonb),
  
  -- Science Activities
  ('science', 'Solar System Basics', 'Learn about planets and stars', '6', 'quiz', 'easy', 10, 15,
   '{"questions": [{"question": "How many planets are in our solar system?", "options": ["7", "8", "9", "10"], "correct": 1}]}'::jsonb),
  
  ('science', 'Chemical Reactions', 'Understanding chemical equations', '9', 'experiment', 'medium', 25, 30,
   '{"experiment": "Vinegar and Baking Soda Reaction", "steps": ["Add vinegar", "Add baking soda", "Observe reaction"]}'::jsonb),
  
  ('science', 'Physics Motion', 'Study laws of motion and forces', '11', 'quiz', 'hard', 30, 25,
   '{"questions": [{"question": "What is Newton''s First Law?", "options": ["F=ma", "Inertia", "Action-Reaction", "Gravity"], "correct": 1}]}'::jsonb),
  
  -- Technology Activities
  ('technology', 'Introduction to Coding', 'Learn basic programming concepts', '6', 'game', 'easy', 15, 20,
   '{"language": "block-based", "concepts": ["loops", "variables", "functions"]}'::jsonb),
  
  ('technology', 'Web Development Basics', 'HTML and CSS fundamentals', '10', 'challenge', 'medium', 25, 40,
   '{"topics": ["HTML tags", "CSS styling", "responsive design"]}'::jsonb),
  
  ('technology', 'AI and Machine Learning', 'Introduction to artificial intelligence', '12', 'quiz', 'hard', 35, 30,
   '{"topics": ["neural networks", "supervised learning", "AI ethics"]}'::jsonb),
  
  -- Engineering Activities
  ('engineering', 'Simple Machines', 'Learn about levers, pulleys, and wheels', '6', 'game', 'easy', 10, 15,
   '{"machines": ["lever", "pulley", "wheel", "inclined plane"]}'::jsonb),
  
  ('engineering', 'Bridge Building Challenge', 'Design and test bridge structures', '8', 'challenge', 'medium', 25, 45,
   '{"challenge": "Build strongest bridge with limited materials"}'::jsonb),
  
  ('engineering', 'Robotics Programming', 'Program robots to complete tasks', '11', 'game', 'hard', 35, 50,
   '{"platform": "virtual robot", "tasks": ["navigate maze", "pick and place", "line following"]}'::jsonb);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE '✅ Sample activities inserted!';
  RAISE NOTICE '✅ Next step: Enable Row Level Security (see DEPLOYMENT_GUIDE.md)';
END $$;
