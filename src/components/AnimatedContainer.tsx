import React, { ReactNode } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { COLORS } from '../utils/colors';
import { useBouncyScaleAnimation } from '../hooks/useBouncyScaleAnimation';

interface AnimatedContainerProps {
  children: ReactNode;
  bgColor?: string;
  style?: ViewStyle;
  animationDuration?: number;
  animationDelay?: number;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  bgColor = COLORS.dark[900],
  style,
  animationDuration = 500,
  animationDelay = 0,
}) => {
  const { animatedStyle } = useBouncyScaleAnimation({
    duration: animationDuration,
    delay: animationDelay,
  });

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          backgroundColor: bgColor,
          paddingVertical: 20,
        },
        animatedStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedContainer;
