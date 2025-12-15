import React from 'react';
import AnimatedContainer from '../../components/AnimatedContainer';
import Text from '../../components/Text';
import { COLORS } from '../../utils/colors';
import { useStyle } from './style';

const Tab3Screen = () => {
  const styles = useStyle();
  return (
    <AnimatedContainer bgColor={COLORS.dark[900]}>
      <Text size={24} bold color={COLORS.green[400]}>
        Tab-3
      </Text>
    </AnimatedContainer>
  );
};

export default Tab3Screen;
