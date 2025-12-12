import React from 'react';
import Container from '../components/Container';
import Text from '../components/Text';
import { COLORS } from '../utils/colors';

const Tab3Screen = () => {
  return (
    <Container bgColor={COLORS.dark[900]}>
      <Text size={24} bold color={COLORS.green[400]}>
        Tab-3
      </Text>
      <Text size={16} color={COLORS.dark[300]} style={{ marginTop: 10 }}>
        Welcome to Tab 3
      </Text>
    </Container>
  );
};

export default Tab3Screen;
