import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.green[400],
      marginBottom: 16,
      textAlign: 'center',
    },
    section: {
      marginBottom: 20,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.dark[200],
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.green[500],
      marginBottom: 12,
    },
    formInputGroup: {
      marginBottom: 12,
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      color: COLORS.dark[700],
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.dark[200],
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: COLORS.dark[900],
      backgroundColor: COLORS.white,
    },
    inputError: {
      borderColor: COLORS.falseOptionBorderColor,
    },
    buttonGroup: {
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    },
    primaryButton: {
      backgroundColor: COLORS.green[500],
    },
    secondaryButton: {
      backgroundColor: COLORS.dark[200],
    },
    dangerButton: {
      backgroundColor: COLORS.falseOptionBorderColor,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.white,
    },
    usersList: {
      marginTop: 12,
    },
    userCard: {
      backgroundColor: COLORS.white,
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      borderLeftWidth: 4,
      borderLeftColor: COLORS.green[500],
      elevation: 2,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    userCardSelected: {
      backgroundColor: COLORS.green[50],
      borderLeftColor: COLORS.green[600],
    },
    userCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    userName: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.dark[900],
    },
    userEmail: {
      fontSize: 12,
      color: COLORS.dark[600],
      marginBottom: 4,
    },
    userRole: {
      fontSize: 12,
      color: COLORS.green[600],
      fontWeight: '500',
    },
    userCardActions: {
      flexDirection: 'row',
      gap: 6,
      marginTop: 8,
    },
    smallButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
      minHeight: 32,
    },
    smallButtonText: {
      fontSize: 12,
      fontWeight: '500',
    },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyStateText: {
      fontSize: 14,
      color: COLORS.dark[500],
      textAlign: 'center',
    },
    errorContainer: {
      backgroundColor: COLORS.falseOptionBGColor,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: COLORS.falseOptionBorderColor,
    },
    errorText: {
      fontSize: 12,
      color: COLORS.falseOptionBorderColor,
    },
  });
};
