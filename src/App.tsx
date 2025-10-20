import { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { StudentDashboard } from "./components/StudentDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { authHelpers } from "./lib/supabase";

export type UserRole = 'student' | 'teacher' | null;
export type Language = 'en' | 'hi' | 'od';
export type Grade = '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface UserData {
  role: UserRole;
  name: string;
  email: string;
  grade?: Grade;
  id: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('login');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { session } = await authHelpers.getSession();
        
        if (session?.user) {
          // Get user profile
          const { profile } = await authHelpers.getUserProfile(session.user.id);
          
          if (profile) {
            const userData: UserData = {
              role: profile.role as UserRole,
              name: profile.name,
              email: profile.email,
              grade: profile.grade as Grade | undefined,
              id: profile.id
            };
            setUserData(userData);
            setCurrentView('dashboard');
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = (data: UserData) => {
    setUserData(data);
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    await authHelpers.signOut();
    setUserData(null);
    setCurrentView('login');
  };

  // Show loading state while checking session
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'login') {
    return (
      <LoginPage 
        language={language}
        onLanguageChange={(lang) => setLanguage(lang as Language)}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="size-full">
      {userData?.role === 'student' && (
        <StudentDashboard 
          language={language}
          onLanguageChange={(lang) => setLanguage(lang as Language)}
          onLogout={handleLogout}
          userData={userData}
        />
      )}
      {userData?.role === 'teacher' && (
        <TeacherDashboard 
          language={language}
          onLanguageChange={(lang) => setLanguage(lang as Language)}
          onLogout={handleLogout}
          userData={userData}
        />
      )}
    </div>
  );
}