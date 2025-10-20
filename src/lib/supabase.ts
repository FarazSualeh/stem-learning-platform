/**
 * Supabase Client Configuration
 * This file initializes the Supabase client for authentication and database operations
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

// Check if we're in production mode with Supabase configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create Supabase client (or placeholder for demo mode)
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; // In demo mode, this won't be used

// Type definitions for database tables
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'student' | 'teacher';
          grade: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role: 'student' | 'teacher';
          grade?: string | null;
        };
        Update: {
          name?: string;
          grade?: string | null;
        };
      };
      student_progress: {
        Row: {
          id: string;
          user_id: string;
          subject: 'mathematics' | 'science' | 'technology' | 'engineering';
          activities_completed: number;
          total_activities: number;
          points: number;
          badges: string[];
          current_level: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          subject: 'mathematics' | 'science' | 'technology' | 'engineering';
          activities_completed?: number;
          total_activities?: number;
          points?: number;
          badges?: string[];
          current_level?: number;
        };
        Update: {
          activities_completed?: number;
          total_activities?: number;
          points?: number;
          badges?: string[];
          current_level?: number;
        };
      };
      classes: {
        Row: {
          id: string;
          teacher_id: string;
          class_name: string;
          grade: string;
          subject: string | null;
          description: string | null;
          student_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          teacher_id: string;
          class_name: string;
          grade: string;
          subject?: string | null;
          description?: string | null;
        };
        Update: {
          class_name?: string;
          description?: string | null;
        };
      };
      activities: {
        Row: {
          id: string;
          subject: 'mathematics' | 'science' | 'technology' | 'engineering';
          title: string;
          description: string | null;
          grade_level: string;
          activity_type: 'quiz' | 'game' | 'challenge' | 'experiment';
          difficulty: 'easy' | 'medium' | 'hard';
          points_reward: number;
          estimated_time_minutes: number | null;
          content: any;
          created_at: string;
          updated_at: string;
        };
      };
      quiz_results: {
        Row: {
          id: string;
          user_id: string;
          activity_id: string;
          score: number;
          max_score: number;
          time_taken_seconds: number | null;
          answers: any;
          points_earned: number;
          completed_at: string;
        };
        Insert: {
          user_id: string;
          activity_id: string;
          score: number;
          max_score: number;
          time_taken_seconds?: number | null;
          answers?: any;
          points_earned?: number;
        };
      };
      student_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_type: 'badge' | 'trophy' | 'certificate' | 'streak';
          achievement_name: string;
          achievement_icon: string | null;
          subject: string | null;
          earned_at: string;
        };
        Insert: {
          user_id: string;
          achievement_type: 'badge' | 'trophy' | 'certificate' | 'streak';
          achievement_name: string;
          achievement_icon?: string | null;
          subject?: string | null;
        };
      };
    };
  };
}

// Authentication helper functions
export const authHelpers = {
  /**
   * Sign up a new user
   */
  signUp: async (email: string, password: string, userData: { name: string; role: 'student' | 'teacher'; grade?: string }) => {
    // DEMO MODE: If Supabase not configured, use mock authentication
    if (!isSupabaseConfigured) {
      console.warn('🔧 DEMO MODE: Supabase not configured. Using mock authentication.');
      // Mock successful signup
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        created_at: new Date().toISOString(),
      };
      return { user: mockUser, error: null };
    }

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          name: userData.name,
          role: userData.role,
          grade: userData.grade || null,
        });

      if (profileError) throw profileError;

      return { user: authData.user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  },

  /**
   * Sign in existing user
   */
  signIn: async (email: string, password: string) => {
    // DEMO MODE: If Supabase not configured, use mock authentication
    if (!isSupabaseConfigured) {
      console.warn('🔧 DEMO MODE: Supabase not configured. Using mock authentication.');
      // Mock successful login (accept any email with @ and password length >= 4)
      if (email.includes('@') && password.length >= 4) {
        const mockProfile = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          role: 'student',
          grade: '8',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        return { user: { id: mockProfile.id, email }, profile: mockProfile, error: null };
      } else {
        return { user: null, profile: null, error: 'Invalid credentials' };
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      return { user: data.user, profile, error: null };
    } catch (error: any) {
      return { user: null, profile: null, error: error.message };
    }
  },

  /**
   * Sign out current user
   */
  signOut: async () => {
    if (!isSupabaseConfigured) {
      return { error: null };
    }
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  /**
   * Get current session
   */
  getSession: async () => {
    if (!isSupabaseConfigured) {
      return { session: null, error: null };
    }
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  /**
   * Get current user profile
   */
  getUserProfile: async (userId: string) => {
    if (!isSupabaseConfigured) {
      return { profile: null, error: null };
    }
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    return { profile: data, error };
  },
};

// Student data helper functions
export const studentHelpers = {
  /**
   * Get student progress for all subjects
   */
  getProgress: async (userId: string) => {
    if (!isSupabaseConfigured) {
      return { progress: [], error: null };
    }
    const { data, error } = await supabase
      .from('student_progress')
      .select('*')
      .eq('user_id', userId);

    return { progress: data, error };
  },

  /**
   * Update student progress
   */
  updateProgress: async (userId: string, subject: string, updates: any) => {
    if (!isSupabaseConfigured) {
      return { progress: null, error: null };
    }
    const { data, error } = await supabase
      .from('student_progress')
      .update(updates)
      .eq('user_id', userId)
      .eq('subject', subject)
      .select()
      .single();

    return { progress: data, error };
  },

  /**
   * Get available activities for student's grade
   */
  getActivities: async (grade: string, subject?: string) => {
    if (!isSupabaseConfigured) {
      return { activities: [], error: null };
    }
    let query = supabase
      .from('activities')
      .select('*')
      .eq('grade_level', grade);

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query;
    return { activities: data, error };
  },

  /**
   * Submit quiz result
   */
  submitQuizResult: async (result: {
    user_id: string;
    activity_id: string;
    score: number;
    max_score: number;
    time_taken_seconds?: number;
    answers?: any;
    points_earned: number;
  }) => {
    if (!isSupabaseConfigured) {
      return { result: null, error: null };
    }
    const { data, error } = await supabase
      .from('quiz_results')
      .insert(result)
      .select()
      .single();

    return { result: data, error };
  },

  /**
   * Get student achievements
   */
  getAchievements: async (userId: string) => {
    if (!isSupabaseConfigured) {
      return { achievements: [], error: null };
    }
    const { data, error } = await supabase
      .from('student_achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    return { achievements: data, error };
  },
};

// Teacher data helper functions
export const teacherHelpers = {
  /**
   * Get all classes for a teacher
   */
  getClasses: async (teacherId: string) => {
    if (!isSupabaseConfigured) {
      return { classes: [], error: null };
    }
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false });

    return { classes: data, error };
  },

  /**
   * Create a new class
   */
  createClass: async (classData: {
    teacher_id: string;
    class_name: string;
    grade: string;
    subject?: string;
    description?: string;
  }) => {
    if (!isSupabaseConfigured) {
      return { class: null, error: null };
    }
    const { data, error } = await supabase
      .from('classes')
      .insert(classData)
      .select()
      .single();

    return { class: data, error };
  },

  /**
   * Get students in a class
   */
  getClassStudents: async (classId: string) => {
    if (!isSupabaseConfigured) {
      return { students: [], error: null };
    }
    const { data, error } = await supabase
      .from('class_students')
      .select(`
        student_id,
        joined_at,
        users (
          id,
          name,
          email,
          grade
        )
      `)
      .eq('class_id', classId);

    return { students: data, error };
  },

  /**
   * Get analytics for all students in teacher's classes
   */
  getClassAnalytics: async (teacherId: string) => {
    if (!isSupabaseConfigured) {
      return { analytics: null, error: null };
    }
    // First get all classes
    const { data: classes } = await supabase
      .from('classes')
      .select('id')
      .eq('teacher_id', teacherId);

    if (!classes || classes.length === 0) {
      return { analytics: null, error: null };
    }

    const classIds = classes.map(c => c.id);

    // Get all students in these classes
    const { data: students } = await supabase
      .from('class_students')
      .select('student_id')
      .in('class_id', classIds);

    if (!students || students.length === 0) {
      return { analytics: null, error: null };
    }

    const studentIds = students.map(s => s.student_id);

    // Get progress for all students
    const { data: progress, error } = await supabase
      .from('student_progress')
      .select('*')
      .in('user_id', studentIds);

    return { analytics: progress, error };
  },
};

export default supabase;
