import React from 'react';
import Container from '../components/Container';
import Text from '../components/Text';
import { COLORS } from '../utils/colors';

const Tab4Screen = () => {
  return (
    <Container bgColor={COLORS.dark[800]}>
      <Text size={24} bold color={COLORS.green[500]}>
        Tab-4
      </Text>
      <Text size={16} color={COLORS.dark[300]} style={{ marginTop: 10 }}>
        Welcome to Tab 4
      </Text>
    </Container>
  );
};

export default Tab4Screen;
