import React from 'react';
import AnimatedContainer from '../components/AnimatedContainer';
import Text from '../components/Text';
import { COLORS } from '../utils/colors';

const Tab2Screen = () => {
  return (
    <AnimatedContainer bgColor={COLORS.dark[900]}>
      <Text size={24} bold color={COLORS.green[500]}>
        Tab-2
      </Text>
    </AnimatedContainer>
  );
};

export default Tab2Screen;
