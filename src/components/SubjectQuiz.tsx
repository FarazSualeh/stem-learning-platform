import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Trophy, Star } from "lucide-react";

interface SubjectQuizProps {
  subject: string;
  language: string;
  grade: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
  onBack: () => void;
}

const translations = {
  en: {
    mathematics: "Mathematics Quiz",
    science: "Science Quiz", 
    technology: "Technology Quiz",
    engineering: "Engineering Quiz",
    question: "Question",
    of: "of",
    nextQuestion: "Next Question",
    submitAnswer: "Submit Answer",
    tryAgain: "Try Again",
    backToDashboard: "Back to Dashboard",
    correct: "Correct!",
    incorrect: "Incorrect",
    quizComplete: "Quiz Complete!",
    yourScore: "Your Score",
    pointsEarned: "Points Earned",
    newLevel: "New Level Unlocked!",
    wellDone: "Well Done!"
  },
  hi: {
    mathematics: "गणित क्विज",
    science: "विज्ञान क्विज",
    technology: "प्रौद्योगिकी क्विज", 
    engineering: "इंजीनियरिंग क्विज",
    question: "प्रश्न",
    of: "में से",
    nextQuestion: "अगला प्रश्न",
    submitAnswer: "उत्तर जमा करें",
    tryAgain: "फिर कोशिश करें",
    backToDashboard: "डैशबोर्ड पर वापस",
    correct: "सही!",
    incorrect: "गलत",
    quizComplete: "क्विज पूर्ण!",
    yourScore: "आपका स्कोर",
    pointsEarned: "अर्जित अंक",
    newLevel: "नया स्तर खुला!",
    wellDone: "अच्छा किया!"
  },
  od: {
    mathematics: "ଗଣିତ କୁଇଜ୍",
    science: "ବିଜ୍ଞାନ କୁଇଜ୍",
    technology: "ପ୍ରଯୁକ୍ତିବିଦ୍ୟା କୁଇଜ୍",
    engineering: "ଇଞ୍ଜିନିୟରିଂ କୁଇଜ୍",
    question: "ପ୍ରଶ୍ନ",
    of: "ର",
    nextQuestion: "ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ",
    submitAnswer: "ଉତ୍ତର ଦାଖଲ କରନ୍ତୁ",
    tryAgain: "ପୁନଃ ଚେଷ୍ଟା କରନ୍ତୁ",
    backToDashboard: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    correct: "ସଠିକ୍!",
    incorrect: "ଭୁଲ",
    quizComplete: "କୁଇଜ୍ ସମ୍ପୂର୍ଣ୍ଣ!",
    yourScore: "ଆପଣଙ୍କର ସ୍କୋର",
    pointsEarned: "ଅର୍ଜିତ ପଏଣ୍ଟ",
    newLevel: "ନୂତନ ସ୍ତର ଖୋଲିଗଲା!",
    wellDone: "ବହୁତ ଭଲ!"
  }
};

export function SubjectQuiz({ subject, language, grade, questions, onBack }: SubjectQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Ensure language is valid, default to 'en'
  const validLanguage = (language && ['en', 'hi', 'od'].includes(language)) ? language : 'en';
  const t = translations[validLanguage as keyof typeof translations] || translations.en;

  useEffect(() => {
    if (!showResult && !quizComplete && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleSubmitAnswer();
    }
  }, [timeLeft, showResult, quizComplete]);

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // Mark as unanswered
    }
    const isCorrect = selectedAnswer !== null && questions[currentQuestion].options[selectedAnswer] === questions[currentQuestion].answer;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 10);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizComplete(true);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
    setTimeLeft(30);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>No Questions Found</CardTitle>
            <CardDescription>
              No quiz questions are available for this subject and grade.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onBack}>{t.backToDashboard}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizComplete) {
    const finalScore = Math.round((score / (questions.length * 10)) * 100);
    const pointsEarned = score * 2;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <Trophy className="mx-auto w-16 h-16 text-yellow-500 mb-4" />
            <CardTitle className="text-3xl">{t.quizComplete}</CardTitle>
            <CardDescription>{t.wellDone}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl">{finalScore}%</div>
                <div className="text-sm text-gray-600">{t.yourScore}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl">{pointsEarned}</div>
                <div className="text-sm text-gray-600">{t.pointsEarned}</div>
              </div>
            </div>

            {finalScore >= 80 && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <Star className="mx-auto w-8 h-8 text-yellow-500 mb-2" />
                <p className="text-yellow-700">{t.newLevel}</p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={handleTryAgain}>
                {t.tryAgain}
              </Button>
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToDashboard}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToDashboard}
          </Button>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl">{t[subject as keyof typeof translations.en]}</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                {t.question} {currentQuestion + 1} {t.of} {questions.length}
              </Badge>
              <Badge variant={timeLeft <= 10 ? "destructive" : "secondary"}>
                {timeLeft}s
              </Badge>
            </div>
          </div>

          <Progress value={progress} className="mb-6" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                  className={`p-4 text-left border-2 rounded-lg transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? option === currentQ.answer
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-blue-500 bg-blue-50"
                      : showResult && option === currentQ.answer
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && (
                      <>
                        {option === currentQ.answer && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {selectedAnswer === index && option !== currentQ.answer && (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`mt-4 p-4 rounded-lg ${
                selectedAnswer !== null && currentQ.options[selectedAnswer] === currentQ.answer ? "bg-green-50" : "bg-red-50"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswer !== null && currentQ.options[selectedAnswer] === currentQ.answer ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-700">{t.correct}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="text-red-700">{t.incorrect}</span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              {!showResult ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                >
                  {t.submitAnswer}
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestion + 1 < questions.length ? t.nextQuestion : t.quizComplete}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}