import React from 'react';
import Container from '../components/Container';
import Text from '../components/Text';
import { COLORS } from '../utils/colors';

const Tab2Screen = () => {
  return (
    <Container bgColor={COLORS.dark[800]}>
      <Text size={24} bold color={COLORS.green[500]}>
        Tab-2
      </Text>
      <Text size={16} color={COLORS.dark[300]} style={{ marginTop: 10 }}>
        Welcome to Tab 2
      </Text>
    </Container>
  );
};

export default Tab2Screen;
