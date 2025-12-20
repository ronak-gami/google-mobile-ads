import React from 'react';
import Text from '../../components/Text';
import { COLORS } from '../../utils/colors';
import { useStyle } from './style';
import Container from '../../components/Container';

const Tab4Screen = () => {
  const styles = useStyle();
  return (
    <Container style={{ justifyContent: 'center' }}>
      <Text
        style={{ textAlign: 'center' }}
        size={24}
        bold
        color={COLORS.green[400]}
      >
        Tab-4
      </Text>
    </Container>
  );
};

export default Tab4Screen;
