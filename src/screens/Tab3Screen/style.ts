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
    tasksList: {
      marginTop: 12,
    },
    taskCard: {
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
    taskCardSelected: {
      backgroundColor: COLORS.green[50],
      borderLeftColor: COLORS.green[600],
    },
    taskCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    taskTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.dark[900],
      flex: 1,
    },
    taskDescription: {
      fontSize: 12,
      color: COLORS.dark[600],
      marginBottom: 4,
    },
    taskPriority: {
      fontSize: 11,
      fontWeight: '500',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginRight: 8,
    },
    taskStatus: {
      fontSize: 11,
      fontWeight: '500',
      color: COLORS.green[600],
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
    // Popover styles
    popoverStyle: {
      backgroundColor: COLORS.white,
      borderRadius: 8,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    popoverContentContainer: {
      maxHeight: 380,
      width: 300,
    },
    // Tooltip styles
    tooltipContentContainer: {
      flex: 1,
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    tooltipScrollContainer: {
      // flex: 1,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    tooltipLoadingContainer: {
      paddingVertical: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tooltipEmptyContainer: {
      paddingVertical: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tooltipMenuItem: {
      paddingHorizontal: 14,
      paddingVertical: 14,
      marginHorizontal: 0,
      marginVertical: 0,
      borderRadius: 0,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.dark[100],
    },
    tooltipMenuItemSelected: {
      backgroundColor: COLORS.green[50],
      borderBottomColor: COLORS.green[300],
      borderLeftWidth: 4,
      borderLeftColor: COLORS.green[500],
      borderRadius: 0,
    },
    tooltipMenuItemText: {
      fontSize: 15,
      fontWeight: '600',
      color: COLORS.dark[900],
      lineHeight: 20,
    },
    tooltipMenuItemTextSelected: {
      color: COLORS.green[700],
    },
    tooltipMenuItemSubtext: {
      fontSize: 12,
      color: COLORS.dark[500],
      marginTop: 3,
      lineHeight: 16,
    },
    tooltipMenuItemSubtextSelected: {
      color: COLORS.green[500],
    },
  });
};

