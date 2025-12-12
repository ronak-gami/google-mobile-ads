import React from 'react';
import AnimatedContainer from '../components/AnimatedContainer';
import Text from '../components/Text';
import { COLORS } from '../utils/colors';

const Tab1Screen = () => {
  return (
    <AnimatedContainer bgColor={COLORS.dark[900]}>
      <Text size={24} bold color={COLORS.green[400]}>
        Tab-1
      </Text>
    </AnimatedContainer>
  );
};

export default Tab1Screen;
