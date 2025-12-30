import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  AdEventType,
  RewardedAdEventType,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import Text from '../../components/Text';
import { COLORS } from '../../utils/colors';
import { useStyle } from './style';
import quizData from '../../../quiz.json';
import Container from '../../components/Container';
import { AD_UNITS } from '../../utils/adUnits';
import { Button } from '../../components/Button';
import * as Icons from 'react-native-heroicons/solid';
import Tooltip from 'rn-tooltip';
import { width } from '../../utils/helper';
import { useAds } from '../../context/AdContext';

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
  const { isAdFree, setAdFreeUntil, adFreeTimeRemaining } = useAds();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const interstitialAdRef = useRef<InterstitialAd | null>(null);
  const rewardedAdRef = useRef<RewardedAd | null>(null);

  useEffect(() => {
    loadInterstitialAd();
    loadRewardedAd();
  }, []);

  const loadRewardedAd = () => {
    const rewardedAd = RewardedAd.createForAdRequest(AD_UNITS.REWARDED, {
      keywords: ['fashion', 'clothing'],
    });

    rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('Rewarded Ad loaded');
      rewardedAdRef.current = rewardedAd;
    });

    rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      console.log('User earned reward:', reward);
      setAdFreeUntil(5); // Set ad-free for 5 minutes
    });

    rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Rewarded Ad closed');
      loadRewardedAd();
    });

    rewardedAd.addAdEventListener(AdEventType.ERROR, error => {
      console.log('Rewarded Ad error:', error);
      loadRewardedAd();
    });

    rewardedAd.load();
  };

  const loadInterstitialAd = () => {
    const interstitialAd = InterstitialAd.createForAdRequest(
      AD_UNITS.INTERSTITIAL,
      { keywords: ['fashion', 'clothing'] },
    );

    interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial Ad loaded');
      interstitialAdRef.current = interstitialAd;
    });

    interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Interstitial Ad closed');
      startQuiz();
      loadInterstitialAd();
    });

    interstitialAd.addAdEventListener(AdEventType.ERROR, error => {
      console.log('Interstitial Ad error:', error);
      startQuiz(); // Start quiz even if ad fails
      loadInterstitialAd();
    });

    interstitialAd.load();
  };

  const handleStartQuiz = () => {
    if (isAdFree) {
      startQuiz();
      return;
    }
    if (interstitialAdRef.current) {
      interstitialAdRef.current.show();
    } else {
      startQuiz();
    }
  };

  const startQuiz = () => {
    initializeQuiz();
    setQuizStarted(true);
  };

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
    if (isAdFree) {
      startQuiz();
      return;
    }
    if (interstitialAdRef.current) {
      interstitialAdRef.current.show();
    } else {
      startQuiz();
    }
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

  if (!quizStarted) {
    return (
      <Container>
        <TouchableOpacity
          style={styles.adView}
          onPress={() => {
            if (!isAdFree && rewardedAdRef.current) {
              rewardedAdRef.current.show();
            }
          }}
        >
          <Text
            style={{ textAlign: 'center', alignSelf: 'center' }}
            size={14}
            color={COLORS.dark[300]}
          >
            {isAdFree
              ? `${Math.floor(adFreeTimeRemaining / 60)}:${(
                  adFreeTimeRemaining % 60
                )
                  .toString()
                  .padStart(2, '0')}`
              : 'Watch Ad'}
          </Text>
          <Pressable
            style={{ alignSelf: 'center' }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Tooltip
              actionType="press"
              height={'auto'}
              width={width * 0.7}
              withOverlay={false}
              withPointer={true}
              backgroundColor={COLORS.dark[700]}
              popover={
                <Text
                  style={{ textAlign: 'center' }}
                  color={COLORS.white}
                  size={14}
                >
                  Watch the master ad to unlock 5 minutes of uninterrupted,
                  ad-free usage.
                </Text>
              }
            >
              <Icons.InformationCircleIcon
                size={20}
                color={COLORS.dark[300]}
                style={{ alignSelf: 'center' }}
              />
            </Tooltip>
          </Pressable>
        </TouchableOpacity>
        <View style={styles.startContainer}>
          <Text
            size={40}
            bold
            color={COLORS.green[400]}
            style={styles.welcomeTitle}
          >
            Quiz App 🎯
          </Text>
          <Text
            size={18}
            color={COLORS.dark[300]}
            style={styles.welcomeSubtitle}
          >
            Test your knowledge with {TOTAL_QUESTIONS} random questions
          </Text>

          <View style={styles.infoCard}>
            <Text size={16} color={COLORS.dark[200]} style={styles.infoText}>
              📝 {TOTAL_QUESTIONS} questions per quiz
            </Text>
            <Text size={16} color={COLORS.dark[200]} style={styles.infoText}>
              ⏱️ No time limit
            </Text>
            <Text size={16} color={COLORS.dark[200]} style={styles.infoText}>
              🎲 Random questions
            </Text>
            <Text size={16} color={COLORS.dark[200]} style={styles.infoText}>
              ✅ Instant feedback
            </Text>
          </View>

          <Button title="Start Quiz" onPress={handleStartQuiz} />
        </View>
        {!isAdFree && (
          <View style={styles.bannerContainer}>
            <BannerAd
              unitId={AD_UNITS.BANNER}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
          </View>
        )}
      </Container>
    );
  }

  if (questions.length === 0) {
    return (
      <Container>
        <Text size={20} color={COLORS.green[400]}>
          Loading Quiz...
        </Text>
      </Container>
    );
  }

  if (showResult) {
    return (
      <Container>
        <TouchableOpacity
          style={styles.adView}
          onPress={() => {
            if (!isAdFree && rewardedAdRef.current) {
              rewardedAdRef.current.show();
            }
          }}
        >
          <Text
            style={{ textAlign: 'center', alignSelf: 'center' }}
            size={14}
            color={COLORS.dark[300]}
          >
            {isAdFree
              ? `${Math.floor(adFreeTimeRemaining / 60)}:${(
                  adFreeTimeRemaining % 60
                )
                  .toString()
                  .padStart(2, '0')}`
              : 'Watch Ad'}
          </Text>
          <Pressable
            style={{ alignSelf: 'center' }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Tooltip
              actionType="press"
              height={'auto'}
              width={width * 0.7}
              withOverlay={false}
              withPointer={true}
              backgroundColor={COLORS.dark[700]}
              popover={
                <Text
                  style={{ textAlign: 'center' }}
                  color={COLORS.white}
                  size={14}
                >
                  Watch the master ad to unlock 5 minutes of uninterrupted,
                  ad-free usage.
                </Text>
              }
            >
              <Icons.InformationCircleIcon
                size={20}
                color={COLORS.dark[300]}
                style={{ alignSelf: 'center' }}
              />
            </Tooltip>
          </Pressable>
        </TouchableOpacity>
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

          <Button title="Start New Quiz" onPress={handleReset} />
        </View>
        {!isAdFree && (
          <View style={styles.bannerContainer}>
            <BannerAd
              unitId={AD_UNITS.BANNER}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
          </View>
        )}
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ paddingBottom: 60 }}
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
            <Button
              title={
                currentQuestionIndex < TOTAL_QUESTIONS - 1
                  ? 'Next Question'
                  : 'View Results'
              }
              onPress={handleNext}
            />
          )}
        </View>
      </ScrollView>
      {!isAdFree && (
        <View style={styles.bannerContainer}>
          <BannerAd
            unitId={AD_UNITS.BANNER}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        </View>
      )}
    </Container>
  );
};

export default Tab1Screen;
