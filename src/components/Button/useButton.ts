import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';

const DURATION = 350;
const START_RADIUS = 50;

export const useButton = (
  buttonWidth: number,
  buttonRadius: number,
  onPress?: () => void,
) => {
  const left = useSharedValue(0);
  const right = useSharedValue(0);
  const radius = useSharedValue(START_RADIUS);
  const opacity = useSharedValue(0);

  const tapGesture = Gesture.Tap().onBegin(e => {
    const x = e.x;

    // reset
    left.value = x;
    right.value = x;
    radius.value = START_RADIUS;
    opacity.value = 1;

    // expand
    left.value = withTiming(0, { duration: DURATION });
    right.value = withTiming(buttonWidth, { duration: DURATION }, finished => {
      if (finished) {
        if (onPress) {
          runOnJS(onPress)();
        }

        // fade out wave (do NOT change base color)
        opacity.value = withTiming(0, { duration: 80 }, () => {
          left.value = x;
          right.value = x;
        });
      }
    });

    // morph radius to match button
    radius.value = withTiming(buttonRadius, {
      duration: DURATION,
    });
  });

  const waveStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: left.value,
      width: right.value - left.value,
      borderRadius: radius.value,
      opacity: opacity.value,
    };
  });

  return {
    tapGesture,
    waveStyle,
  };
};
