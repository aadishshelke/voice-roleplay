import React, { useState, useEffect } from "react";
import { INSURANCE_QUIZZES } from "../data/quizData";
import { motion } from "framer-motion";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

function shuffleAndPick(quizType: string): QuizQuestion[] {
  const available = INSURANCE_QUIZZES[quizType] || [];
  const pool =
    available.length < 10
      ? [...available].flatMap(() => available).slice(0, 10)
      : [...available];
  return pool.sort(() => 0.5 - Math.random()).slice(0, 10);
}

function calculateScore(questions: QuizQuestion[], answers: { [key: number]: number }) {
  let correct = 0;
  const results = questions.map((q, idx) => {
    const userIdx = answers[idx];
    const isCorrect = userIdx === q.correctAnswer;
    if (isCorrect) correct++;
    return {
      question: q.question,
      userAnswer: q.options[userIdx] || "No answer",
      correctAnswer: q.options[q.correctAnswer],
      isCorrect,
      explanation: q.explanation
    };
  });
  return { score: (correct / questions.length) * 100, results };
}

const Quiz: React.FC = () => {
  const [quizType, setQuizType] = useState<string>("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when quiz type changes
  useEffect(() => {
    if (quizType) {
      setIsLoading(true);
      setError(null);
      try {
        const newQuestions = shuffleAndPick(quizType);
        if (newQuestions.length === 0) {
          setError("No questions available for this quiz type.");
        } else {
          setQuestions(newQuestions);
          setCurrent(0);
          setAnswers({});
          setCompleted(false);
        }
      } catch (err) {
        setError("Failed to load questions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [quizType]);

  const handleStart = () => {
    if (quizType) {
      setIsLoading(true);
      try {
        setQuestions(shuffleAndPick(quizType));
        setCurrent(0);
        setAnswers({});
        setCompleted(false);
      } catch (err) {
        setError("Failed to start quiz. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAnswer = (idx: number, optionIdx: number) => {
    setAnswers({ ...answers, [idx]: optionIdx });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
    }
  };

  const { score, results } = completed
    ? calculateScore(questions, answers)
    : { score: 0, results: [] };

  const renderQuizContent = () => {
    if (error) {
      return (
        <div className="text-center p-4 text-red-600">
          <p>{error}</p>
          <button
            onClick={() => setQuizType("")}
            className="mt-4 bg-blue-600 text-white rounded px-4 py-2"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading questions...</p>
        </div>
      );
    }

    if (!quizType) {
      return (
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">Select Quiz Type:</label>
          <select
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
          >
            <option value="">-- choose one --</option>
            {Object.keys(INSURANCE_QUIZZES).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            onClick={handleStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition-colors"
            disabled={!quizType}
          >
            Start Quiz
          </button>
        </div>
      );
    }

    if (completed) {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">Quiz Results 📝</h3>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">Your Score: {score.toFixed(1)}%</p>
            <div className="h-2 bg-gray-200 rounded mt-2">
              <motion.div
                className="h-2 bg-green-500 rounded"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {results.map((r, i) => (
              <details key={i} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <summary className="font-medium cursor-pointer">
                  Question {i + 1}: {r.question}
                </summary>
                <div className="mt-3 space-y-2">
                  {r.isCorrect ? (
                    <p className="text-green-600">✅ Your answer: {r.userAnswer}</p>
                  ) : (
                    <>
                      <p className="text-red-600">❌ Your answer: {r.userAnswer}</p>
                      <p className="text-green-600">
                        ✅ Correct answer: {r.correctAnswer}
                      </p>
                    </>
                  )}
                  <p className="text-gray-600 text-sm">ℹ️ {r.explanation}</p>
                </div>
              </details>
            ))}
          </div>

          <button
            onClick={() => {
              setQuizType("");
              setQuestions([]);
              setCurrent(0);
              setAnswers({});
              setCompleted(false);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
          >
            Take Another Quiz
          </button>
        </div>
      );
    }

    if (questions.length === 0 || current >= questions.length) {
      return (
        <div className="text-center p-4 text-gray-600">
          <p>No questions available. Please try another quiz type.</p>
          <button
            onClick={() => setQuizType("")}
            className="mt-4 bg-blue-600 text-white rounded px-4 py-2"
          >
            Back to Quiz Selection
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <div className="h-2 bg-gray-200 rounded">
            <motion.div
              className="h-2 bg-blue-600 rounded"
              initial={{ width: 0 }}
              animate={{ width: `${(current / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Question {current + 1} of {questions.length}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <p className="font-medium text-lg mb-4">{questions[current].question}</p>
          <div className="space-y-3">
            {questions[current].options.map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name={`q_${current}`}
                  checked={answers[current] === idx}
                  onChange={() => handleAnswer(current, idx)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {current < questions.length - 1 ? "Next" : "Finish Quiz"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-4 space-y-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Insurance Knowledge Quiz 📚
      </h2>
      {renderQuizContent()}
    </motion.div>
  );
};

export default Quiz; 