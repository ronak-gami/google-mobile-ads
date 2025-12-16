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
  bgColor = COLORS.background,
  style,
}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Container;
