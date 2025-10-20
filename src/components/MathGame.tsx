import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ArrowLeft, Star, Trophy, Zap } from "lucide-react";

interface MathGameProps {
  language: string;
  grade: string;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Math Adventure",
    score: "Score",
    level: "Level",
    timeLeft: "Time Left",
    correct: "Correct!",
    wrong: "Wrong!",
    gameOver: "Game Over!",
    finalScore: "Final Score",
    playAgain: "Play Again",
    backToDashboard: "Back to Dashboard",
    instructions: "Solve as many math problems as you can before time runs out!",
    pointsEarned: "points earned!",
    newHighScore: "New High Score!",
    wellDone: "Well Done!"
  },
  hi: {
    title: "गणित साहसिक",
    score: "स्कोर",
    level: "स्तर",
    timeLeft: "समय बचा",
    correct: "सही!",
    wrong: "गलत!",
    gameOver: "खेल समाप्त!",
    finalScore: "अंतिम स्कोर",
    playAgain: "फिर खेलें",
    backToDashboard: "डैशबोर्ड पर वापस",
    instructions: "समय समाप्त होने से पहले जितने हो सके उतने गणित के प्रश्न हल करें!",
    pointsEarned: "अंक अर्जित!",
    newHighScore: "नया उच्च स्कोर!",
    wellDone: "बहुत अच्छा!"
  },
  od: {
    title: "ଗଣିତ ଦୁଃସାହସିକ କାର୍ଯ୍ୟ",
    score: "ସ୍କୋର",
    level: "ସ୍ତର",
    timeLeft: "ସମୟ ବାକି",
    correct: "ସଠିକ୍!",
    wrong: "ଭୁଲ!",
    gameOver: "ଖେଳ ସମାପ୍ତ!",
    finalScore: "ଅନ୍ତିମ ସ୍କୋର",
    playAgain: "ପୁଣି ଖେଳନ୍ତୁ",
    backToDashboard: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    instructions: "ସମୟ ସରିବା ପୂର୍ବରୁ ଯେତେ ପାରିବେ ସେତେ ଗଣିତ ପ୍ରଶ୍ନ ସମାଧାନ କରନ୍ତୁ!",
    pointsEarned: "ପଏଣ୍ଟ ଅର୍ଜନ!",
    newHighScore: "ନୂତନ ଉଚ୍ଚ ସ୍କୋର!",
    wellDone: "ବହୁତ ଭଲ!"
  }
};

const allOperations = ['+', '-', '×', '÷'];

export function MathGame({ language, grade, onBack }: MathGameProps) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0, operation: '+', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const validLanguage = (language && ['en', 'hi', 'od'].includes(language)) ? language : 'en';
  const t = translations[validLanguage as keyof typeof translations] || translations.en;

  // 🎯 Adjusted difficulty per grade
  const getGradeSettings = (gradeStr: string) => {
    const g = Number(gradeStr);
    if (g <= 6) return { range: 10, ops: ['+'] };
    if (g === 7) return { range: 20, ops: ['+', '-'] };
    if (g === 8) return { range: 50, ops: ['+', '-', '×'] };
    if (g === 9) return { range: 100, ops: ['+', '-', '×', '÷'] };
    if (g === 10) return { range: 200, ops: ['+', '-', '×', '÷'] };
    if (g === 11) return { range: 500, ops: ['+', '-', '×', '÷'] };
    if (g >= 12) return { range: 1000, ops: ['+', '-', '×', '÷'] };
    return { range: 10, ops: ['+'] };
  };

  const generateProblem = () => {
    const settings = getGradeSettings(grade);
    const operation = settings.ops[Math.floor(Math.random() * settings.ops.length)];
    let num1, num2, answer;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * settings.range) + 1;
        num2 = Math.floor(Math.random() * settings.range) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * settings.range) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * Math.min(12, settings.range / 5)) + 1;
        num2 = Math.floor(Math.random() * Math.min(12, settings.range / 5)) + 1;
        answer = num1 * num2;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * Math.min(12, settings.range / 5)) + 1;
        answer = Math.floor(Math.random() * Math.min(12, settings.range / 5)) + 1;
        num1 = num2 * answer;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
    }

    setCurrentProblem({ num1, num2, operation, answer });
  };

  const checkAnswer = () => {
    const userNum = parseInt(userAnswer);
    if (userNum === currentProblem.answer) {
      const points = level * 10 + streak * 5;
      setScore(score + points);
      setStreak(streak + 1);
      setFeedback(`${t.correct} +${points} ${t.pointsEarned}`);
      if (streak > 0 && streak % 5 === 0) setLevel(level + 1);
    } else {
      setStreak(0);
      setFeedback(`${t.wrong} Answer: ${currentProblem.answer}`);
    }

    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswer('');
      generateProblem();
    }, 1500);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setGameActive(true);
    setStreak(0);
    setUserAnswer('');
    setFeedback('');
    setShowFeedback(false);
    generateProblem();
  };

  useEffect(() => {
    generateProblem();
  }, []);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer && gameActive && !showFeedback) checkAnswer();
  };

  if (!gameActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Trophy className="mx-auto w-16 h-16 text-yellow-500 mb-4" />
            <CardTitle className="text-2xl">{t.gameOver}</CardTitle>
            <CardDescription>{t.wellDone}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl">{score}</div>
            <p className="text-sm text-gray-600">{t.finalScore}</p>

            {score > 500 && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <Star className="mx-auto w-8 h-8 text-yellow-500 mb-2" />
                <p className="text-yellow-700">{t.newHighScore}</p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame}>{t.playAgain}</Button>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToDashboard}
        </Button>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">{t.title} - Grade {grade}</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{t.level} {level}</Badge>
            <Badge variant="secondary">{t.score}: {score}</Badge>
            <Badge variant={timeLeft <= 10 ? "destructive" : "default"}>
              {t.timeLeft}: {timeLeft}s
            </Badge>
          </div>
        </div>

        <Progress value={(timeLeft / 60) * 100} className="mb-4" />

        {streak > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">Streak: {streak}</span>
          </div>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardDescription className="text-center">{t.instructions}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl mb-8 font-mono">
              {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
            </div>

            {showFeedback ? (
              <div className={`text-2xl mb-6 p-4 rounded-lg ${
                feedback.includes(t.correct) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {feedback}
              </div>
            ) : (
              <div className="mb-6">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-4xl text-center border-2 border-gray-300 rounded-lg p-4 w-48 focus:border-blue-500 focus:outline-none"
                  placeholder="?"
                  autoFocus
                />
              </div>
            )}

            {!showFeedback && (
              <Button onClick={checkAnswer} disabled={!userAnswer} size="lg" className="text-xl px-8 py-4">
                Submit Answer
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
