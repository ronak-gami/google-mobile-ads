import React, { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { useButton } from './useButton';
import { BUTTON_RADIUS, styles } from './style';
import Text from '../Text';
import { COLORS } from '../../utils/colors';

type Props = {
  title: string;
  onPress?: () => void;
};

export const Button = ({ title, onPress }: Props) => {
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const { tapGesture, waveStyle } = useButton(width, BUTTON_RADIUS, onPress);

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={styles.container} onLayout={onLayout}>
        <Animated.View style={[styles.wave, waveStyle]} />
        <Text size={20} bold color={COLORS.dark[900]}>
          {title}
        </Text>
      </View>
    </GestureDetector>
  );
};
