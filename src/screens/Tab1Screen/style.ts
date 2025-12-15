import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const useStyle = () => {
  return StyleSheet.create({
    contentContainer: {
      width: '88%',
      alignSelf: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    categoryBadge: {
      backgroundColor: COLORS.dark[800],
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: COLORS.green[400],
    },
    questionCard: {
      backgroundColor: COLORS.dark[800],
      padding: 24,
      borderRadius: 16,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: COLORS.green[400],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    questionText: {
      lineHeight: 28,
    },
    optionsContainer: {
      gap: 12,
      marginBottom: 24,
    },
    option: {
      backgroundColor: COLORS.dark[800],
      padding: 16,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: COLORS.dark[700],
    },
    correctOption: {
      backgroundColor: '#1a4d2e',
      borderColor: '#22c55e',
      borderWidth: 2,
    },
    wrongOption: {
      backgroundColor: '#4d1a1a',
      borderColor: '#ef4444',
      borderWidth: 2,
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    optionNumber: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: COLORS.green[400],
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionText: {
      flex: 1,
      lineHeight: 22,
    },
    nextButton: {
      backgroundColor: COLORS.green[400],
      padding: 18,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 20,
      shadowColor: COLORS.green[400],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    resultContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '85%',
      alignSelf: 'center',
    },
    resultTitle: {
      marginBottom: 40,
      textAlign: 'center',
    },
    scoreCard: {
      backgroundColor: COLORS.dark[800],
      padding: 40,
      borderRadius: 24,
      alignItems: 'center',
      marginBottom: 40,
      borderWidth: 2,
      borderColor: COLORS.green[400],
      shadowColor: COLORS.green[400],
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 10,
    },
    scoreLabel: {
      marginBottom: 16,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    scoreValue: {
      marginBottom: 8,
    },
    percentage: {
      opacity: 0.8,
    },
    resetButton: {
      backgroundColor: COLORS.green[400],
      paddingVertical: 18,
      paddingHorizontal: 40,
      borderRadius: 12,
      shadowColor: COLORS.green[400],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  });
};
