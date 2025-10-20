import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LanguageSelector } from "./LanguageSelector";
import { GraduationCap, Users, BookOpen, Trophy, Eye, EyeOff, Sparkles, Rocket, Star, Zap, School, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import type { UserData, UserRole, Grade } from "../App";
import { authHelpers, isSupabaseConfigured } from "../lib/supabase";

interface LoginPageProps {
  language: string;
  onLanguageChange: (language: string) => void;
  onLogin: (userData: UserData) => void;
}

// Password strength helper function
function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  let color = "bg-red-500";
  let label = "Very Weak";
  if (score === 2) { color = "bg-orange-400"; label = "Weak Password"; }
  if (score === 3) { color = "bg-yellow-400"; label = "Good one"; }
  if (score === 4) { color = "bg-green-500"; label = "Ahha Genius"; }
  return { score, color, label };
}

const translations = {
  en: {
    title: "STEM Learning Platform",
    subtitle: "Learn Science, Technology, Engineering & Maths through fun games and quizzes!",
    loginTitle: "Welcome Back!",
    signupTitle: "Join the Adventure!",
    selectRole: "I am a...",
    student: "Student",
    teacher: "Teacher",
    email: "Email",
    password: "Password",
    name: "Full Name",
    grade: "Grade",
    login: "Login",
    signup: "Sign Up",
    switchToSignup: "Don't have an account? Sign up",
    switchToLogin: "Already have an account? Login",
    studentDesc: "Access interactive quizzes, games, and track your learning progress",
    teacherDesc: "Manage classes, create activities, and monitor student performance",
    getStarted: "Get Started",
    forStudents: "For Students (Grade 6-12)",
    forTeachers: "For Educators",
    features: "Platform Features",
    interactiveQuizzes: "Interactive Quizzes",
    educationalGames: "Educational Games", 
    progressTracking: "Progress Tracking",
    achievements: "Achievements & Rewards",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    enterName: "Enter your full name",
    selectGrade: "Select your grade",
    grade6: "Grade 6",
    grade7: "Grade 7", 
    grade8: "Grade 8",
    grade9: "Grade 9",
    grade10: "Grade 10",
    grade11: "Grade 11",
    grade12: "Grade 12",
    loginError: "Invalid email or password",
    requiredFields: "Please fill in all required fields",
    gradeRequired: "Grade selection is required for students",
    gradeHelper: "Your grade helps us customize content for your level"
  },
  hi: {
    title: "STEM शिक्षा मंच",
    subtitle: "मजेदार खेलों और प्रश्नोत्तरी के माध्यम से विज्ञान, प्रौद्योगिकी, इंजीनियरिंग और गणित सीखें!",
    loginTitle: "वापस आपका स्वागत है!",
    signupTitle: "रोमांच में शामिल हों!",
    selectRole: "मैं हूँ...",
    student: "छात्र",
    teacher: "शिक्षक",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "पूरा नाम",
    grade: "कक्षा",
    login: "लॉगिन",
    signup: "साइन अप",
    switchToSignup: "खाता नहीं है? साइन अप करें",
    switchToLogin: "पहले से खाता है? लॉगिन करें",
    studentDesc: "इंटरैक्टिव क्विज़, गेम्स का उपयोग करें और अपनी सीखने की प्रगति को ट्रैक करें",
    teacherDesc: "कक्षाओं का प्रबंधन करें, गतिविधियां बनाएं, और छात्र प्रदर्शन की निगरानी करें",
    getStarted: "शुरू करें",
    forStudents: "छात्रों के लिए (कक्षा 6-12)",
    forTeachers: "शिक्षकों के लिए",
    features: "प्लेटफॉर्म सुविधाएं",
    interactiveQuizzes: "इंटरैक्टिव क्विज़",
    educationalGames: "शैक्षिक खेल",
    progressTracking: "प्रगति ट्रैकिंग",
    achievements: "उपलब्धियां और पुरस्कार",
    enterEmail: "अपना ईमेल दर्ज करें",
    enterPassword: "अपना पासवर्ड दर्ज करें",
    enterName: "अपना पूरा नाम दर्ज करें",
    selectGrade: "अपनी कक्षा चुनें",
    grade6: "कक्षा 6",
    grade7: "कक्षा 7",
    grade8: "कक्षा 8",
    grade9: "कक्षा 9",
    grade10: "कक्षा 10",
    grade11: "कक्षा 11",
    grade12: "कक्षा 12",
    loginError: "अमान्य ईमेल या पासवर्ड",
    requiredFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
    gradeRequired: "छात्रों के लिए कक्षा चयन आवश्यक है",
    gradeHelper: "आपकी कक्षा हमें आपके स्तर के लिए सामग्री को अनुकूलित करने में मदद करती है"
  },
  od: {
    title: "STEM ଶିକ୍ଷା ପ୍ଲାଟଫର୍ମ",
    subtitle: "ମଜାଦାର ଖେଳ ଏବଂ କୁଇଜ୍ ମାଧ୍ୟମରେ ବିଜ୍ଞାନ, ପ୍ରଯୁକ୍ତିବିଦ୍ୟା, ଇଞ୍ଜିନିୟରିଂ ଏବଂ ଗଣିତ ଶିଖନ୍ତୁ!",
    loginTitle: "ପୁନର୍ବାର ସ୍ବାଗତ!",
    signupTitle: "ଦୁଃସାହସିକ କାର୍ଯ୍ୟରେ ଯୋଗ ଦିଅନ୍ତୁ!",
    selectRole: "ମୁଁ ଜଣେ...",
    student: "ଛାତ୍ର",
    teacher: "ଶିକ୍ଷକ",
    email: "ଇମେଲ",
    password: "ପାସୱାର୍ଡ",
    name: "ପୂର୍ଣ୍ଣ ନାମ",
    grade: "ଶ୍ରେଣୀ",
    login: "ଲଗଇନ",
    signup: "ସାଇନ ଅପ",
    switchToSignup: "ଖାତା ନାହିଁ? ସାଇନ ଅପ କରନ୍ତୁ",
    switchToLogin: "ପୂର୍ବରୁ ଖାତା ଅଛି? ଲଗଇନ କରନ୍ତୁ",
    studentDesc: "ଇଣ୍ଟରାକ୍ଟିଭ୍ କୁଇଜ୍, ଖେଳ ବ୍ୟବହାର କରନ୍ତୁ ଏବଂ ଆପଣଙ୍କର ଶିଖିବା ପ୍ରଗତି ଟ୍ରାକ୍ କରନ୍ତୁ",
    teacherDesc: "କ୍ଲାସ୍ ପରିଚାଳନା କରନ୍ତୁ, କାର୍ଯ୍ୟକଳାପ ସୃଷ୍ଟି କରନ୍ତୁ, ଏବଂ ଛାତ୍ର ପ୍ରଦର୍ଶନ ନିରୀକ୍ଷଣ କରନ୍ତୁ",
    getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
    forStudents: "ଛାତ୍ରମାନଙ୍କ ପାଇଁ (ଶ୍ରେଣୀ 6-12)",
    forTeachers: "ଶିକ୍ଷାବିତ୍‍ମାନଙ୍କ ପାଇଁ",
    features: "ପ୍ଲାଟଫର୍ମ ସୁବିଧା",
    interactiveQuizzes: "ଇଣ୍ଟରାକ୍ଟିଭ୍ କୁଇଜ୍",
    educationalGames: "ଶିକ୍ଷାଗତ ଖେଳ",
    progressTracking: "ପ୍ରଗତି ଟ୍ରାକିଂ",
    achievements: "ସଫଳତା ଏବଂ ପୁରସ୍କାର",
    enterEmail: "ଆପଣଙ୍କର ଇମେଲ ପ୍ରବେଶ କରନ୍ତୁ",
    enterPassword: "ଆପଣଙ୍କର ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
    enterName: "ଆପଣଙ୍କର ପୂର୍ଣ୍ଣ ନାମ ପ୍ରବେଶ କରନ୍ତୁ",
    selectGrade: "ଆପଣଙ୍କର ଶ୍ରେଣୀ ବାଛନ୍ତୁ",
    grade6: "ଶ୍ରେଣୀ 6",
    grade7: "ଶ୍ରେଣୀ 7",
    grade8: "ଶ୍ରେଣୀ 8",
    grade9: "ଶ୍ରେଣୀ 9",
    grade10: "ଶ୍ରେଣୀ 10",
    grade11: "ଶ୍ରେଣୀ 11",
    grade12: "ଶ୍ରେଣୀ 12",
    loginError: "ଅବୈଧ ଇମେଲ କିମ୍ବା ପାସୱାର୍ଡ",
    requiredFields: "ଦୟାକରି ସମସ୍ତ ଆବଶ୍ୟକ ଫିଲ୍ଡ ପୂରଣ କରନ୍ତୁ",
    gradeRequired: "ଛାତ୍ରମାନଙ୍କ ପାଇଁ ଶ୍ରେଣୀ ବାଛିବା ଆବଶ୍ୟକ",
    gradeHelper: "ଆପଣଙ୍କର ଶ୍ରେଣୀ ଆମକୁ ଆପଣଙ୍କ ସ୍ତର ପାଇଁ ବିଷୟବସ୍ତୁ ଅନୁକୂଳ କରିବାରେ ସାହାଯ୍ୟ କରେ"
  }
};

const FloatingIcon = ({ Icon, delay = 0, duration = 3 }: { Icon: any, delay?: number, duration?: number }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute opacity-20"
  >
    <Icon className="w-6 h-6 text-current" />
  </motion.div>
);

export function LoginPage({ language, onLanguageChange, onLogin }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    grade: '' as Grade | ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const t = translations[language as keyof typeof translations];

  // Password strength calculation state
  const strength = getPasswordStrength(formData.password);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !selectedRole) {
      setError(t.requiredFields);
      return false;
    }
    
    if (!isLogin && !formData.name) {
      setError(t.requiredFields);
      return false;
    }
    
    if (selectedRole === 'student' && !formData.grade) {
      setError(t.gradeRequired);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login with Supabase (or demo mode)
        const { user, profile, error } = await authHelpers.signIn(
          formData.email,
          formData.password
        );
        
        if (error || !profile) {
          setError(error || t.loginError);
          setLoading(false);
          return;
        }
        
        const userData: UserData = {
          role: (profile.role || selectedRole || 'student') as UserRole,
          name: profile.name || formData.name || formData.email.split('@')[0],
          email: profile.email,
          grade: profile.grade as Grade | undefined,
          id: profile.id
        };
        onLogin(userData);
      } else {
        // Sign up with Supabase (or demo mode)
        const { user, error } = await authHelpers.signUp(
          formData.email,
          formData.password,
          {
            name: formData.name,
            role: selectedRole as 'student' | 'teacher',
            grade: selectedRole === 'student' ? formData.grade : undefined
          }
        );
        
        if (error || !user) {
          setError(error || 'Failed to create account');
          setLoading(false);
          return;
        }
        
        const userData: UserData = {
          role: selectedRole as UserRole,
          name: formData.name,
          email: formData.email,
          grade: selectedRole === 'student' ? (formData.grade as Grade) : undefined,
          id: user.id
        };
        onLogin(userData);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Demo Mode Banner */}
      {!isSupabaseConfigured && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              🔧 <strong>DEMO MODE</strong> - Data won't persist. Follow SETUP_INSTRUCTIONS.md to deploy with real database.
            </span>
          </div>
        </div>
      )}
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon Icon={Star} delay={0} />
        <div className="absolute top-20 left-1/4">
          <FloatingIcon Icon={Sparkles} delay={1} />
        </div>
        <div className="absolute top-32 right-1/4">
          <FloatingIcon Icon={Rocket} delay={2} />
        </div>
        <div className="absolute bottom-32 left-1/3">
          <FloatingIcon Icon={Trophy} delay={0.5} />
        </div>
        <div className="absolute bottom-20 right-1/3">
          <FloatingIcon Icon={Zap} delay={1.5} />
        </div>
      </div>

      <header className="p-4 flex justify-end relative z-10">
        <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {!selectedRole ? (
          // Role Selection Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <div className="text-center mb-12">
              <motion.div 
                className="flex items-center justify-center gap-4 mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <GraduationCap className="w-16 h-16 text-violet-600" />
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                </div>
                <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t.title}
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t.subtitle}
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { icon: BookOpen, title: t.interactiveQuizzes, color: "text-blue-500" },
                  { icon: Trophy, title: t.educationalGames, color: "text-yellow-500" },
                  { icon: Users, title: t.progressTracking, color: "text-green-500" },
                  { icon: GraduationCap, title: t.achievements, color: "text-purple-500" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center p-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className={`w-12 h-12 ${feature.color} mb-2`} />
                    <h3 className="text-sm font-medium">{feature.title}</h3>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Role Selection */}
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-3xl text-center mb-8 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                {t.selectRole}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    role: 'student' as UserRole,
                    icon: GraduationCap,
                    title: t.student,
                    subtitle: t.forStudents,
                    description: t.studentDesc,
                    gradient: "from-blue-400 to-blue-600",
                    bgGradient: "from-blue-50 to-blue-100"
                  },
                  {
                    role: 'teacher' as UserRole,
                    icon: Users,
                    title: t.teacher,
                    subtitle: t.forTeachers,
                    description: t.teacherDesc,
                    gradient: "from-purple-400 to-purple-600",
                    bgGradient: "from-purple-50 to-purple-100"
                  }
                ].map((option) => (
                  <motion.div
                    key={option.role}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 hover:border-transparent bg-gradient-to-br ${option.bgGradient} overflow-hidden relative`}
                      onClick={() => setSelectedRole(option.role)}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full" />
                      
                      <CardHeader className="text-center pb-4 relative">
                        <motion.div 
                          className={`mx-auto w-24 h-24 bg-gradient-to-br ${option.gradient} rounded-full flex items-center justify-center mb-4 shadow-lg`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <option.icon className="w-12 h-12 text-white" />
                        </motion.div>
                        <CardTitle className="text-2xl text-gray-800">{option.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-600">{option.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <ImageWithFallback 
                          src={option.role === 'student' 
                            ? "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBzdGVtfGVufDF8fHx8MTc1ODIxNjI0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            : "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc1ODIxNjI0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          }
                          alt={option.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{option.description}</p>
                        <Button 
                          className={`w-full bg-gradient-to-r ${option.gradient} hover:opacity-90 transform hover:scale-105 transition-all duration-200 shadow-lg text-white border-0`}
                          size="lg"
                        >
                          <Rocket className="w-4 h-4 mr-2" />
                          {t.getStarted}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // Authentication Form
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg ${
                    selectedRole === 'student' 
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                      : 'bg-gradient-to-br from-purple-400 to-purple-600'
                  }`}>
                    {selectedRole === 'student' ? (
                      <GraduationCap className="w-8 h-8 text-white" />
                    ) : (
                      <Users className="w-8 h-8 text-white" />
                    )}
                  </div>
                </motion.div>
                <CardTitle className="text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {isLogin ? t.loginTitle : t.signupTitle}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {selectedRole === 'student' ? t.forStudents : t.forTeachers}
                </CardDescription>
              </CardHeader>


              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label htmlFor="name">{t.name}</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t.enterName}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-white/50"
                      />
                    </motion.div>
                  )}


                  <div>
                    <Label htmlFor="email">{t.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.enterEmail}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/50"
                    />
                  </div>


                  <div>
                    <Label htmlFor="password">{t.password}</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t.enterPassword}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-white/50 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                    {/* Password strength meter */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="h-2 rounded bg-gray-200 overflow-hidden mb-1">
                          <div
                            className={`${strength.color} h-2 transition-all duration-300`}
                            style={{ width: `${(strength.score / 4) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs ml-1" style={{color: strength.color.replace("bg-", "")}}>
                          {strength.label}
                        </span>
                      </div>
                    )}
                  </div>


                  {selectedRole === 'student' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg -z-10 opacity-50"></div>
                      <div className="p-3 rounded-lg border border-blue-200 bg-white/70 backdrop-blur-sm">
                        <Label htmlFor="grade" className="flex items-center gap-2">
                          <School className="w-4 h-4 text-blue-500" />
                          <span>{t.grade}</span>
                          <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.grade} onValueChange={(value: string) => handleInputChange('grade', value)}>
                          <SelectTrigger className="bg-white/50 border-2 focus:border-blue-400">
                            <SelectValue placeholder={t.selectGrade} />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { value: '6', label: t.grade6, desc: 'Basic STEM foundations' },
                              { value: '7', label: t.grade7, desc: 'Intermediate concepts' },
                              { value: '8', label: t.grade8, desc: 'Advanced problem solving' },
                              { value: '9', label: t.grade9, desc: 'High school preparation' },
                              { value: '10', label: t.grade10, desc: 'For Board Exams' },
                              { value: '11', label: t.grade11, desc: 'Pre-university level' },
                              { value: '12', label: t.grade12, desc: 'University preparation' }
                            ].map((grade) => (
                              <SelectItem key={grade.value} value={grade.value}>
                                <div className="flex flex-col">
                                  <span>{grade.label}</span>
                                  <span className="text-xs text-gray-500">{grade.desc}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500 mt-1">
                          {t.gradeHelper}
                        </p>
                        {isLogin && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-2 p-2 bg-blue-50 rounded border border-blue-200"
                          >
                            <p className="text-xs text-blue-700 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Content will be customized for your grade level
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}


                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm text-center bg-red-50 p-2 rounded"
                    >
                      {error}
                    </motion.div>
                  )}


                  <Button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${
                      selectedRole === 'student' 
                        ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                        : 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                    } transform hover:scale-105 transition-all duration-200 shadow-lg border-0`}
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                      </motion.div>
                    ) : (
                      <Rocket className="w-4 h-4 mr-2" />
                    )}
                    {isLogin ? t.login : t.signup}
                  </Button>


                  <div className="text-center space-y-2">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      {isLogin ? t.switchToSignup : t.switchToLogin}
                    </Button>
                    
                    <br />
                    
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setSelectedRole(null);
                        setError('');
                        setFormData({ email: '', password: '', name: '', grade: '' });
                      }}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      ← Back to role selection
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {/* Footer */}
        <motion.footer 
          className="text-center mt-16 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>© STEM Learning Platform Designed by INSPIRA</p>
        </motion.footer>
      </main>
    </div>
  );
}