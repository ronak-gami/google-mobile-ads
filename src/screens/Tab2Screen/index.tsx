import React from 'react';
import Text from '../../components/Text';
import { COLORS } from '../../utils/colors';
import { useStyle } from './style';
import Container from '../../components/Container';

const Tab2Screen = () => {
  const styles = useStyle();
  return (
    <Container>
      <Text size={24} bold color={COLORS.green[500]}>
        Tab-2
      </Text>
    </Container>
  );
};

export default Tab2Screen;
