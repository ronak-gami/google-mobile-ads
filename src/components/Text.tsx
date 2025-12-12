import React, { ReactNode } from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { COLORS } from '../utils/colors';

interface CustomTextProps extends TextProps {
  children: ReactNode;
  color?: string;
  size?: number;
  bold?: boolean;
}

const Text: React.FC<CustomTextProps> = ({
  children,
  color = COLORS.text,
  size = 16,
  bold = false,
  style,
  ...props
}) => {
  return (
    <RNText
      style={[
        {
          color,
          fontSize: size,
          fontWeight: bold ? '700' : '400',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
