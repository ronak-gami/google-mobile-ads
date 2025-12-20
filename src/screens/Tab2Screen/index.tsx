import React from 'react';
import Container from '../../components/Container';
import { Button } from '../../components/Button';
import Text from '../../components/Text';
import { COLORS } from '../../utils/colors';

const Tab2Screen = () => {
  return (
    <Container style={{ justifyContent: 'center' }}>
      <Text
        style={{ textAlign: 'center' }}
        size={24}
        bold
        color={COLORS.green[400]}
      >
        Tab-2
      </Text>
    </Container>
  );
};

export default Tab2Screen;
