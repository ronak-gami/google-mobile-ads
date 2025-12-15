import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import AnimatedContainer from '../../components/AnimatedContainer';
import Text from '../../components/Text';
import { COLORS } from '../../utils/colors';
import { useStyle } from './style';
import quizData from '../../../quiz.json';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

const TOTAL_QUESTIONS = 10;

const Tab1Screen = () => {
  const styles = useStyle();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    initializeQuiz();
  }, []);

  const initializeQuiz = () => {
    // Randomly select 10 unique questions
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, TOTAL_QUESTIONS);
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;

    setSelectedAnswer(index);
    setIsAnswered(true);

    // Check if answer is correct
    if (index === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    initializeQuiz();
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return styles.option;
    }

    const correctIndex = questions[currentQuestionIndex].correctAnswerIndex;

    if (index === correctIndex) {
      return [styles.option, styles.correctOption];
    }

    if (index === selectedAnswer && index !== correctIndex) {
      return [styles.option, styles.wrongOption];
    }

    return styles.option;
  };

  if (questions.length === 0) {
    return (
      <AnimatedContainer bgColor={COLORS.dark[900]}>
        <Text size={20} color={COLORS.green[400]}>
          Loading Quiz...
        </Text>
      </AnimatedContainer>
    );
  }

  if (showResult) {
    return (
      <AnimatedContainer bgColor={COLORS.dark[900]}>
        <View style={styles.resultContainer}>
          <Text
            size={32}
            bold
            color={COLORS.green[400]}
            style={styles.resultTitle}
          >
            Quiz Completed! 🎉
          </Text>

          <View style={styles.scoreCard}>
            <Text size={24} color={COLORS.dark[300]} style={styles.scoreLabel}>
              Your Score
            </Text>
            <Text
              size={64}
              bold
              color={COLORS.green[400]}
              style={styles.scoreValue}
            >
              {score}/{TOTAL_QUESTIONS}
            </Text>
            <Text size={18} color={COLORS.dark[400]} style={styles.percentage}>
              {Math.round((score / TOTAL_QUESTIONS) * 100)}%
            </Text>
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text size={18} bold color={COLORS.dark[900]}>
              Start New Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </AnimatedContainer>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <AnimatedContainer bgColor={COLORS.dark[900]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: '100%' }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text size={18} bold color={COLORS.green[400]}>
              Question {currentQuestionIndex + 1}/{TOTAL_QUESTIONS}
            </Text>
            <View style={styles.categoryBadge}>
              <Text size={14} color={COLORS.green[400]}>
                {currentQuestion.category}
              </Text>
            </View>
          </View>

          <View style={styles.questionCard}>
            <Text
              size={20}
              bold
              color={COLORS.dark[100]}
              style={styles.questionText}
            >
              {currentQuestion.question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={getOptionStyle(index)}
                onPress={() => handleAnswerSelect(index)}
                activeOpacity={0.7}
                disabled={isAnswered}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionNumber}>
                    <Text size={16} bold color={COLORS.dark[900]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text
                    size={16}
                    color={COLORS.dark[100]}
                    style={styles.optionText}
                  >
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {isAnswered && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text size={18} bold color={COLORS.dark[900]}>
                {currentQuestionIndex < TOTAL_QUESTIONS - 1
                  ? 'Next Question'
                  : 'View Results'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </AnimatedContainer>
  );
};

export default Tab1Screen;
