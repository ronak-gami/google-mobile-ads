import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { COLORS } from '../utils/colors';

interface ContainerProps {
  children: ReactNode;
  bgColor?: string;
  style?: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({
  children,
  bgColor = COLORS.dark[900],
  style,
}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: bgColor,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Container;
