import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LanguageSelector } from "./LanguageSelector";
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Plus,
  LogOut,
  GraduationCap,
  Trophy,
  TrendingUp,
  Clock,
  Award,
  Target,
  Eye,
  Download,
  Filter,
  Sparkles,
  Crown,
  MousePointer,
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { UserData } from "../App";

interface TeacherDashboardProps {
  language: string;
  onLanguageChange: (language: string) => void;
  onLogout: () => void;
  userData: UserData;
}

const translations = {
  en: {
    dashboard: "Teacher Dashboard",
    welcome: "Welcome back, Teacher!",
    classes: "My Classes",
    activities: "Activities",
    analytics: "Analytics",
    students: "Students",
    createClass: "Create New Class",
    createActivity: "Create Activity",
    className: "Class Name",
    subject: "Subject",
    grade: "Grade",
    description: "Description",
    activityTitle: "Activity Title",
    activityType: "Activity Type",
    quiz: "Quiz",
    game: "Game",
    assignment: "Assignment",
    create: "Create",
    cancel: "Cancel",
    totalStudents: "Total Students",
    activeClasses: "Active Classes",
    averageScore: "Average Score",
    completionRate: "Completion Rate",
    recentActivities: "Recent Activities",
    classPerformance: "Class Performance",
    topPerformers: "Top Performers",
    mathematics: "Mathematics",
    science: "Science",
    technology: "Technology",
    engineering: "Engineering",
    logout: "Logout",
    grade6: "Grade 6",
    grade7: "Grade 7", 
    grade8: "Grade 8",
    grade9: "Grade 9",
    grade10: "Grade 10",
    grade11: "Grade 11",
    grade12: "Grade 12",
    points: "Points",
    completed: "Completed",
    pending: "Pending",
    inProgress: "In Progress",
    viewDetails: "View Details",
    clickToExplore: "Click to explore detailed analytics",
    detailedAnalytics: "Detailed Analytics",
    viewReport: "View Report",
    downloadReport: "Download Report",
    filterData: "Filter Data",
    studentProgress: "Student Progress",
    subjectDistribution: "Subject Distribution",
    performanceMetrics: "Performance Metrics",
    weeklyProgress: "Weekly Progress",
    monthlyTrends: "Monthly Trends"
  },
  hi: {
    dashboard: "शिक्षक डैशबोर्ड",
    welcome: "वापसी पर स्वागत, शिक्षक जी!",
    classes: "मेरी कक्षाएं",
    activities: "गतिविधियां",
    analytics: "विश्लेषण",
    students: "छात्र",
    createClass: "नई कक्षा बनाएं",
    createActivity: "गतिविधि बनाएं",
    className: "कक्षा का नाम",
    subject: "विषय",
    grade: "कक्षा",
    description: "विवरण",
    activityTitle: "गतिविधि शीर्षक",
    activityType: "गतिविधि प्रकार",
    quiz: "प्रश्नोत्तरी",
    game: "खेल",
    assignment: "असाइनमेंट",
    create: "बनाएं",
    cancel: "रद्द करें",
    totalStudents: "कुल छात्र",
    activeClasses: "सक्रिय कक्षाएं",
    averageScore: "औसत स्कोर",
    completionRate: "पूर्णता दर",
    recentActivities: "हाल की गतिविधियां",
    classPerformance: "कक्षा प्रदर्शन",
    topPerformers: "शीर्ष प्रदर्शनकर्ता",
    mathematics: "गणित",
    science: "विज्ञान",
    technology: "प्रौद्योगिकी",
    engineering: "इंजीनियरिंग",
    logout: "लॉगआउट",
    grade6: "कक्षा 6",
    grade7: "कक्षा 7",
    grade8: "कक्षा 8", 
    grade9: "कक्षा 9",
    grade10: "कक्षा 10",
    grade11: "कक्षा 11",
    grade12: "कक्षा 12",
    points: "अंक",
    completed: "पूर्ण",
    pending: "लंबित",
    inProgress: "चल रहा",
    viewDetails: "विवरण देखें",
    clickToExplore: "विस्तृत विश्लेषण देखने के लिए क्लिक करें",
    detailedAnalytics: "विस्तृत विश्लेषण",
    viewReport: "रिपोर्ट देखें",
    downloadReport: "रिपोर्ट डाउनलोड करें",
    filterData: "डेटा फिल्टर करें",
    studentProgress: "छात्र प्रगति",
    subjectDistribution: "विषय वितरण",
    performanceMetrics: "प्रदर्शन मेट्रिक्स",
    weeklyProgress: "साप्ताहिक प्रगति",
    monthlyTrends: "मासिक रुझान"
  },
  od: {
    dashboard: "ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ",
    welcome: "ସ୍ୱାଗତ, ଶିକ୍ଷକ!",
    classes: "ମୋର କ୍ଲାସ୍",
    activities: "କାର୍ଯ୍ୟକଳାପ",
    analytics: "ବିଶ୍ଳେଷଣ",
    students: "ଛାତ୍ରମାନେ",
    createClass: "ନୂତନ କ୍ଲାସ୍ ସୃଷ୍ଟି କରନ୍ତୁ",
    createActivity: "କାର୍ଯ୍ୟକଳାପ ସୃଷ୍ଟି କରନ୍ତୁ",
    className: "କ୍ଲାସ୍ ନାମ",
    subject: "ବିଷୟ",
    grade: "ଶ୍ରେଣୀ",
    description: "ବର୍ଣ୍ଣନା",
    activityTitle: "କାର୍ଯ୍ୟକଳାପ ଶୀର୍ଷକ",
    activityType: "କାର୍ଯ୍ୟକଳାପ ପ୍ରକାର",
    quiz: "କୁଇଜ୍",
    game: "ଖେଳ",
    assignment: "ଆସାଇନମେଣ୍ଟ",
    create: "ସୃଷ୍ଟି କରନ୍ତୁ",
    cancel: "ବାତିଲ୍",
    totalStudents: "ମୋଟ ଛାତ୍ର",
    activeClasses: "ସକ୍ରିୟ କ୍ଲାସ୍",
    averageScore: "ହାରାହାରି ସ୍କୋର",
    completionRate: "ସମାପ୍ତି ହାର",
    recentActivities: "ସାମ୍ପ୍ରତିକ କାର୍ଯ୍ୟକଳାପ",
    classPerformance: "କ୍ଲାସ୍ ପ୍ରଦର୍ଶନ",
    topPerformers: "ଶୀର୍ଷ ପ୍ରଦର୍ଶନକାରୀ",
    mathematics: "ଗଣିତ",
    science: "ବିଜ୍ଞାନ",
    technology: "ପ୍ରଯୁକ୍ତିବିଦ୍ୟା",
    engineering: "ଇଞ୍ଜିନିୟରିଂ",
    logout: "ଲଗଆଉଟ୍",
    grade6: "ଶ୍ରେଣୀ 6",
    grade7: "ଶ୍ରେଣୀ 7",
    grade8: "ଶ୍ରେଣୀ 8",
    grade9: "ଶ୍ରେଣୀ 9", 
    grade10: "ଶ୍ରେଣୀ 10",
    grade11: "ଶ୍ରେଣୀ 11",
    grade12: "ଶ୍ରେଣୀ 12",
    points: "ପଏଣ୍ଟ",
    completed: "ସମ୍ପୂର୍ଣ୍ଣ",
    pending: "ବିଚାରାଧୀନ",
    inProgress: "ଚାଲିଛି",
    viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    clickToExplore: "ବିସ୍ତୃତ ବିଶ୍ଳେଷଣ ଦେଖିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ",
    detailedAnalytics: "ବିସ୍ତୃତ ବିଶ୍ଳେଷଣ",
    viewReport: "ରିପୋର୍ଟ ଦେଖନ୍ତୁ",
    downloadReport: "ରିପୋର୍ଟ ଡାଉନଲୋଡ୍ କରନ୍ତୁ",
    filterData: "ଡାଟା ଫିଲ୍ଟର କରନ୍ତୁ",
    studentProgress: "ଛାତ୍ର ପ୍ରଗତି",
    subjectDistribution: "ବିଷୟ ବଣ୍ଟନ",
    performanceMetrics: "ପ୍ରଦର୍ଶନ ମେଟ୍ରିକ୍ସ",
    weeklyProgress: "ସାପ୍ତାହିକ ପ୍ରଗତି",
    monthlyTrends: "ମାସିକ ଧାରା"
  }
};

const classData = [
  { id: 1, name: "Advanced Mathematics", subject: "Mathematics", grade: "Grade 10", students: 28, avgScore: 87 },
  { id: 2, name: "Basic Science", subject: "Science", grade: "Grade 8", students: 32, avgScore: 91 },
  { id: 3, name: "Computer Fundamentals", subject: "Technology", grade: "Grade 9", students: 25, avgScore: 83 },
  { id: 4, name: "Engineering Basics", subject: "Engineering", grade: "Grade 11", students: 22, avgScore: 89 }
];

const studentData = [
  { name: "Arjun Patel", class: "Grade 10", subject: "Mathematics", score: 95, status: "Completed" },
  { name: "Priya Sharma", class: "Grade 8", subject: "Science", score: 92, status: "Completed" },
  { name: "Ravi Kumar", class: "Grade 9", subject: "Technology", score: 88, status: "In Progress" },
  { name: "Sneha Singh", class: "Grade 11", subject: "Engineering", score: 94, status: "Completed" },
  { name: "Vikram Rao", class: "Grade 10", subject: "Mathematics", score: 85, status: "Pending" }
];

export function TeacherDashboard({ language, onLanguageChange, onLogout, userData }: TeacherDashboardProps) {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showCreateActivity, setShowCreateActivity] = useState(false);
  const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false);
  const [selectedAnalyticType, setSelectedAnalyticType] = useState<string | null>(null);
  const [newClass, setNewClass] = useState({
    name: "",
    subject: "",
    grade: "",
    description: ""
  });
  const [newActivity, setNewActivity] = useState({
    title: "",
    type: "",
    subject: "",
    description: ""
  });

  // Ensure language is valid, default to 'en'
  const validLanguage = (language && ['en', 'hi', 'od'].includes(language)) ? language : 'en';
  const t = translations[validLanguage as keyof typeof translations] || translations.en;

  const handleCreateClass = () => {
    console.log("Creating class:", newClass);
    setShowCreateClass(false);
    setNewClass({ name: "", subject: "", grade: "", description: "" });
  };

  const handleCreateActivity = () => {
    console.log("Creating activity:", newActivity);
    setShowCreateActivity(false);
    setNewActivity({ title: "", type: "", subject: "", description: "" });
  };

  const handleAnalyticsClick = (type: string) => {
    setSelectedAnalyticType(type);
    setShowDetailedAnalytics(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <motion.div 
          className="absolute top-20 left-10 text-purple-400"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </div>

      <header className="bg-white/95 shadow-lg border-b border-purple-200 p-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.dashboard}
              </h1>
              <p className="text-sm text-gray-600">
                Empowering young minds through STEM education 🚀
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="border-2 border-red-200 hover:border-red-300 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t.logout}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 relative z-10">
        <div className="mb-8 p-6 bg-white/90 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.welcome.replace('Teacher', userData.name)}
              </h2>
              <p className="text-lg text-gray-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Educator Dashboard
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                value: "142",
                label: t.totalStudents,
                color: "from-blue-400 to-blue-600",
                bgColor: "from-blue-100 to-blue-200"
              },
              {
                icon: BookOpen,
                value: "8",
                label: t.activeClasses,
                color: "from-green-400 to-green-600",
                bgColor: "from-green-100 to-green-200"
              },
              {
                icon: Trophy,
                value: "87%",
                label: t.averageScore,
                color: "from-yellow-400 to-orange-500",
                bgColor: "from-yellow-100 to-orange-200"
              },
              {
                icon: TrendingUp,
                value: "94%",
                label: t.completionRate,
                color: "from-purple-400 to-purple-600",
                bgColor: "from-purple-100 to-purple-200"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-4 bg-gradient-to-br ${stat.bgColor} rounded-2xl border border-gray-200 shadow-md cursor-pointer hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="classes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/90 border border-gray-200 shadow-md rounded-xl p-2">
            <TabsTrigger value="classes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg">
              {t.classes}
            </TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-lg">
              {t.activities}
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-lg">
              {t.students}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg">
              {t.analytics}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">{t.classes}</h3>
              <Button 
                onClick={() => setShowCreateClass(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.createClass}
              </Button>
            </div>

            {showCreateClass && (
              <Card className="bg-white/95 border-2 border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-purple-600" />
                    {t.createClass}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="className">{t.className}</Label>
                      <Input
                        id="className"
                        value={newClass.name}
                        onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                        className="bg-white border-purple-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">{t.subject}</Label>
                      <Select value={newClass.subject} onValueChange={(value) => setNewClass({...newClass, subject: value})}>
                        <SelectTrigger className="bg-white border-purple-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">{t.mathematics}</SelectItem>
                          <SelectItem value="science">{t.science}</SelectItem>
                          <SelectItem value="technology">{t.technology}</SelectItem>
                          <SelectItem value="engineering">{t.engineering}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="grade">{t.grade}</Label>
                    <Select value={newClass.grade} onValueChange={(value) => setNewClass({...newClass, grade: value})}>
                      <SelectTrigger className="bg-white border-purple-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">{t.grade6}</SelectItem>
                        <SelectItem value="7">{t.grade7}</SelectItem>
                        <SelectItem value="8">{t.grade8}</SelectItem>
                        <SelectItem value="9">{t.grade9}</SelectItem>
                        <SelectItem value="10">{t.grade10}</SelectItem>
                        <SelectItem value="11">{t.grade11}</SelectItem>
                        <SelectItem value="12">{t.grade12}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">{t.description}</Label>
                    <Textarea
                      id="description"
                      value={newClass.description}
                      onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                      className="bg-white border-purple-200"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={handleCreateClass} className="bg-gradient-to-r from-purple-500 to-indigo-500">
                      {t.create}
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateClass(false)}>
                      {t.cancel}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classData.map((cls) => (
                <Card key={cls.id} className="hover:shadow-lg transition-shadow bg-white/95 border border-gray-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      {cls.name}
                    </CardTitle>
                    <CardDescription className="font-medium">{cls.subject} • {cls.grade}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {cls.students} Students
                        </span>
                        <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-green-200">
                          {cls.avgScore}% avg
                        </Badge>
                      </div>
                      <Progress value={cls.avgScore} className="h-3" />
                      <Button variant="outline" className="w-full border-2 hover:bg-purple-50">
                        <Eye className="w-4 h-4 mr-2" />
                        {t.viewDetails}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">{t.activities}</h3>
              <Button 
                onClick={() => setShowCreateActivity(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.createActivity}
              </Button>
            </div>

            {showCreateActivity && (
              <Card className="bg-white/95 border-2 border-green-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    {t.createActivity}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="activityTitle">{t.activityTitle}</Label>
                      <Input
                        id="activityTitle"
                        value={newActivity.title}
                        onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                        className="bg-white border-green-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="activityType">{t.activityType}</Label>
                      <Select value={newActivity.type} onValueChange={(value) => setNewActivity({...newActivity, type: value})}>
                        <SelectTrigger className="bg-white border-green-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quiz">{t.quiz}</SelectItem>
                          <SelectItem value="game">{t.game}</SelectItem>
                          <SelectItem value="assignment">{t.assignment}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="activitySubject">{t.subject}</Label>
                    <Select value={newActivity.subject} onValueChange={(value) => setNewActivity({...newActivity, subject: value})}>
                      <SelectTrigger className="bg-white border-green-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">{t.mathematics}</SelectItem>
                        <SelectItem value="science">{t.science}</SelectItem>
                        <SelectItem value="technology">{t.technology}</SelectItem>
                        <SelectItem value="engineering">{t.engineering}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="activityDescription">{t.description}</Label>
                    <Textarea
                      id="activityDescription"
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                      className="bg-white border-green-200"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={handleCreateActivity} className="bg-gradient-to-r from-green-500 to-emerald-500">
                      {t.create}
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateActivity(false)}>
                      {t.cancel}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-white/95 border-2 border-green-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  {t.recentActivities}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: Target, title: "Math Quiz - Algebra Basics", time: "Created 2 hours ago", type: t.quiz, color: "from-blue-400 to-blue-600" },
                    { icon: Award, title: "Science Game - Solar System", time: "Created 1 day ago", type: t.game, color: "from-green-400 to-green-600" }
                  ].map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center`}>
                          <activity.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{activity.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">{t.topPerformers}</h3>
              <Button variant="outline" className="border-2 border-blue-200 hover:bg-blue-50">
                <Filter className="w-4 h-4 mr-2" />
                {t.filterData}
              </Button>
            </div>

            <Card className="bg-white/95 border-2 border-blue-200 shadow-lg">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.map((student, index) => (
                      <TableRow key={index} className="hover:bg-blue-50/50">
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{student.score}%</span>
                            <Progress value={student.score} className="w-20 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            student.status === 'Completed' ? 'default' : 
                            student.status === 'In Progress' ? 'secondary' : 'destructive'
                          }>
                            {student.status === 'Completed' ? t.completed :
                             student.status === 'In Progress' ? t.inProgress : t.pending}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">{t.analytics}</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-2 border-orange-200 hover:bg-orange-50"
                  onClick={() => handleAnalyticsClick('download')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.downloadReport}
                </Button>
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  onClick={() => handleAnalyticsClick('detailed')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  {t.viewReport}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card 
                className="bg-white/95 border-2 border-orange-200 shadow-lg cursor-pointer hover:shadow-xl transition-shadow group"
                onClick={() => handleAnalyticsClick('performance')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-orange-600" />
                      {t.classPerformance}
                    </div>
                    <MousePointer className="w-4 h-4 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription className="text-orange-700">
                    {t.clickToExplore}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBjaGFydCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTgyMTYyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Analytics Chart"
                      className="w-full h-40 object-cover rounded-xl shadow-md"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                        <div className="text-2xl font-bold text-blue-700">89%</div>
                        <div className="text-sm text-blue-600 font-medium">Average Performance</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                        <div className="text-2xl font-bold text-green-700">142</div>
                        <div className="text-sm text-green-600 font-medium">Active Students</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="bg-white/95 border-2 border-pink-200 shadow-lg cursor-pointer hover:shadow-xl transition-shadow group"
                onClick={() => handleAnalyticsClick('subjects')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-pink-600" />
                      {t.subjectDistribution}
                    </div>
                    <MousePointer className="w-4 h-4 text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription className="text-pink-700">
                    {t.clickToExplore}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { subject: t.mathematics, percentage: 35, color: "from-blue-400 to-blue-600" },
                    { subject: t.science, percentage: 28, color: "from-green-400 to-green-600" },
                    { subject: t.technology, percentage: 22, color: "from-purple-400 to-purple-600" },
                    { subject: t.engineering, percentage: 15, color: "from-orange-400 to-orange-600" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{item.subject}</span>
                        <span className="font-bold">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Simplified Analytics Modal */}
            {showDetailedAnalytics && (
              <div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowDetailedAnalytics(false)}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {t.detailedAnalytics}
                      </h2>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowDetailedAnalytics(false)}
                      >
                        ✕
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-blue-800">{t.studentProgress}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">87.5%</div>
                            <p className="text-blue-700">Overall Progress Rate</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-green-800">{t.weeklyProgress}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">+12%</div>
                            <p className="text-green-700">Improvement This Week</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button 
                        className="bg-gradient-to-r from-purple-500 to-pink-500"
                        onClick={() => console.log('Download report')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t.downloadReport}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}