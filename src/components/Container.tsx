import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default Container;
