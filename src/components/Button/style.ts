import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const BUTTON_RADIUS = 14;

export const styles = StyleSheet.create({
  container: {
    height: 54,
    borderRadius: BUTTON_RADIUS,
    backgroundColor: COLORS.green[500],
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  wave: {
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.green[200],
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    zIndex: 1,
  },
});
