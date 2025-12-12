import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface UseBouncyScaleAnimationOptions {
  duration?: number;
  delay?: number;
}

export const useBouncyScaleAnimation = (
  options: UseBouncyScaleAnimationOptions = {},
) => {
  const { duration = 550, delay = 0 } = options;

  const scaleValue = useRef(new Animated.Value(1.08)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animationSequence = [
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]),
    ];

    if (delay > 0) {
      Animated.sequence([Animated.delay(delay), ...animationSequence]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [scaleValue, opacityValue, duration, delay]);

  return {
    scaleValue,
    opacityValue,
    animatedStyle: {
      transform: [{ scale: scaleValue }],
      opacity: opacityValue,
    },
  };
};
