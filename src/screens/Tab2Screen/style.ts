import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const useStyle = () => {
  return StyleSheet.create({
    box: {
      height: 80,
      width: 80,
      margin: 20,
      outlineWidth: 1,
      outlineColor: COLORS.green[500],
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: COLORS.green[500],
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
  });
};
