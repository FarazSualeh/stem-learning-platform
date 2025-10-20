import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LanguageSelector } from "./LanguageSelector";
import {
  BookOpen,
  Calculator,
  Atom,
  Cpu,
  Trophy,
  Star,
  Target,
  LogOut,
  PlayCircle,
  Award,
  Sparkles,
  Zap,
  Crown,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";
import { SubjectQuiz } from "./SubjectQuiz";
import { MathGame } from "./MathGame";
import { ScienceGame } from "./ScienceGame";
import { TechGame } from "./TechGame";
import { EngineeringGame } from "./EngineeringGame";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { UserData } from "../App";

// 🌟 IMPORTS FROM FIXED DATA FILE 🌟
import { subjectQuestions, QuizQuestion, MasterQuestionData } from '../data/quizData'; 

// --- TYPE DEFINITIONS ---
interface StudentDashboardProps {
  language: string;
  onLanguageChange: (language: string) => void;
  onLogout: () => void;
  userData: UserData;
}
// --- END TYPE DEFINITIONS ---


// --- TRANSLATIONS ---
const translations = {
  en: {
    subjects: "Subjects",
    startQuiz: "Start Quiz",
    noQuestions: "No Questions Found",
    noQuestionsDesc: "No quiz questions are available for this subject and grade.",
    gradeLabel: "Grade"
  },
  hi: {
    subjects: "विषय",
    startQuiz: "क्विज शुरू करें",
    noQuestions: "कोई प्रश्न नहीं मिला",
    noQuestionsDesc: "इस विषय और कक्षा के लिए कोई क्विज प्रश्न उपलब्ध नहीं हैं।",
    gradeLabel: "कक्षा"
  },
  od: {
    subjects: "ବିଷୟଗୁଡ଼ିକ",
    startQuiz: "କୁଇଜ୍ ଆରମ୍ଭ କରନ୍ତୁ",
    noQuestions: "କୌଣସି ପ୍ରଶ୍ନ ମିଳିଲା ନାହିଁ",
    noQuestionsDesc: "ଏହି ବିଷୟ ଏବଂ ଶ୍ରେଣୀ ପାଇଁ କୌଣସି କୁଇଜ୍ ପ୍ରଶ୍ନ ଉପଲବ୍ଧ ନାହିଁ ।",
    gradeLabel: "ଶ୍ରେଣୀ"
  }
};

// --- SUBJECTS METADATA ---
const subjects = [
  { id: "math", titleKey: "Mathematics", descriptionKey: "mathDesc" },
  { id: "science", titleKey: "Science", descriptionKey: "scienceDesc" },
  { id: "technology", titleKey: "Technology", descriptionKey: "techDesc" },
  { id: "engineering", titleKey: "Engineering", descriptionKey: "engineeringDesc" }
];

// --- QUIZ DATA TYPES & DATA (ONE DEFINITON ONLY) ---
type QuizQuestion = { question: string; options: string[]; answer: string };

const sampleQuestionsForGrade = (labelPrefix: string): QuizQuestion[] => [
  { question: `${labelPrefix}: Q1`, options: ["A", "B", "C", "D"], answer: "A" },
  { question: `${labelPrefix}: Q2`, options: ["A", "B", "C", "D"], answer: "B" },
  { question: `${labelPrefix}: Q3`, options: ["A", "B", "C", "D"], answer: "C" },
  { question: `${labelPrefix}: Q4`, options: ["A", "B", "C", "D"], answer: "D" }
];

// Define subjectQuestions once and keep consistent structure: subject -> lang -> grade -> questions[]
const subjectQuestions: Record<string, Record<string, Record<string, QuizQuestion[]>>> = {
  math: {
    en: {
      '6': sampleQuestionsForGrade("Math 6"),
      '7': sampleQuestionsForGrade("Math 7"),
      '8': sampleQuestionsForGrade("Math 8"),
      '9': sampleQuestionsForGrade("Math 9"),
      '10': sampleQuestionsForGrade("Math 10"),
      '11': sampleQuestionsForGrade("Math 11"),
      '12': sampleQuestionsForGrade("Math 12")
    },
    // placeholder — will be filled/copied by ensureAllLanguagesAndGrades
    hi: {},
    od: {}
  },
  science: {
    en: {
      '6': sampleQuestionsForGrade("Science 6"),
      '7': sampleQuestionsForGrade("Science 7"),
      '8': sampleQuestionsForGrade("Science 8"),
      '9': sampleQuestionsForGrade("Science 9"),
      '10': sampleQuestionsForGrade("Science 10"),
      '11': [
        { question: "What is Avogadro's number?", options: ["6.022e23", "3.14", "9.8", "1.6e-19"], answer: "6.022e23" },
        { question: "Which organ filters blood?", options: ["Kidney", "Liver", "Heart", "Brain"], answer: "Kidney" },
        { question: "Main gas in air?", options: ["Nitrogen", "Oxygen", "CO2", "Hydrogen"], answer: "Nitrogen" },
        { question: "Chemical symbol for Sodium?", options: ["Na", "N", "S", "So"], answer: "Na" }
      ],
      '12': sampleQuestionsForGrade("Science 12")
    },
    hi: {},
    od: {}
  },
  technology: {
    en: {
      '6': sampleQuestionsForGrade("Tech 6"),
      '7': sampleQuestionsForGrade("Tech 7"),
      '8': sampleQuestionsForGrade("Tech 8"),
      '9': sampleQuestionsForGrade("Tech 9"),
      '10': sampleQuestionsForGrade("Tech 10"),
      '11': sampleQuestionsForGrade("Tech 11"),
      '12': sampleQuestionsForGrade("Tech 12")
    },
    hi: {},
    od: {}
  },
  engineering: {
    en: {
      '6': sampleQuestionsForGrade("Engg 6"),
      '7': sampleQuestionsForGrade("Engg 7"),
      '8': sampleQuestionsForGrade("Engg 8"),
      '9': sampleQuestionsForGrade("Engg 9"),
      '10': sampleQuestionsForGrade("Engg 10"),
      '11': sampleQuestionsForGrade("Engg 11"),
      '12': sampleQuestionsForGrade("Engg 12")
    },
    hi: {},
    od: {}
  }
};

// --- HELPER: Ensure every subject has en/hi/od and grades '6'..'12' ---
const ensureAllLanguagesAndGrades = () => {
  const grades = ['6','7','8','9','10','11','12'];
  const langs = ['en','hi','od'];
  Object.keys(subjectQuestions).forEach((subjectKey) => {
    const subj = subjectQuestions[subjectKey];
    if (!subj) return;
    // ensure langs exist
    langs.forEach(lang => {
      if (!subj[lang]) subj[lang] = {};
      grades.forEach(g => {
        if (!subj[lang][g]) {
          // copy English if present
          if (subj['en'] && subj['en'][g]) subj[lang][g] = subj['en'][g];
          else subj[lang][g] = [];
        }
      });
    });
  });
};

// Call once at module load
ensureAllLanguagesAndGrades();

export function StudentDashboard({
  language,
  onLanguageChange,
  onLogout,
  userData
}: StudentDashboardProps) {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[] | null>(null);

  const validLanguage = ['en','hi','od'].includes(language) ? language : 'en';
  const t = translations[validLanguage as keyof typeof translations] || translations.en;

  useEffect(() => {
    // Clear current questions when language or subject changes
    setCurrentQuestions(null);
  }, [validLanguage, activeSubject]);

  const getQuizQuestions = (subjectId: string, grade?: string): QuizQuestion[] => {
    const gradeKey = (grade || userData?.grade || '6').toString();
    const subj = subjectQuestions[subjectId];
    if (!subj) return [];
    const langBlock = subj[validLanguage];
    if (langBlock && Array.isArray(langBlock[gradeKey])) return langBlock[gradeKey];
    // fallback to English
    const enBlock = subj['en'];
    if (enBlock && Array.isArray(enBlock[gradeKey])) return enBlock[gradeKey];
    return [];
  };

  const startQuiz = (subjectId: string) => {
    const questions = getQuizQuestions(subjectId, userData?.grade);
    if (!questions || questions.length === 0) {
      setCurrentQuestions([]);
      setActiveSubject(subjectId);
      return;
    }
    setCurrentQuestions(questions);
    setActiveSubject(subjectId);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{t.subjects}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
        {subjects.map(s => (
          <div key={s.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{s.titleKey}</div>
            <div style={{ marginBottom: 12, color: "#666" }}>{/* description placeholder */}</div>
            <div style={{ marginBottom: 8 }}>{t.gradeLabel}: {userData?.grade ?? '6'}</div>
            <button onClick={() => startQuiz(s.id)} style={{ padding: "8px 12px" }}>
              {t.startQuiz}
            </button>
          </div>
        ))}
      </div>

      {activeSubject && currentQuestions && currentQuestions.length === 0 && (
        <div style={{ marginTop: 20, padding: 12, border: "1px dashed #e74c3c", borderRadius: 6 }}>
          <h3 style={{ margin: 0 }}>{t.noQuestions}</h3>
          <p style={{ marginTop: 6 }}>{t.noQuestionsDesc}</p>
        </div>
      )}

      {activeSubject && currentQuestions && currentQuestions.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Questions for {activeSubject} — {t.gradeLabel} {userData?.grade ?? '6'}</h3>
          <ol>
            {currentQuestions.map((q, i) => (
              <li key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 600 }}>{q.question}</div>
                <ul>
                  {q.options.map((opt, idx) => <li key={idx}>{opt}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}