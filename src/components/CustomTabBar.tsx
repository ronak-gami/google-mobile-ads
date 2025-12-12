import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  SharedValue,
} from 'react-native-reanimated';
import * as Icons from 'react-native-heroicons/solid';
import { COLORS } from '../utils/colors';
import { width } from '../utils/helper';

const TAB_WIDTH = (width - 20) / 4;

interface TabButtonProps {
  route: any;
  index: number;
  animatedIndex: SharedValue<number>;
  navigation: any;
  descriptors: any;
  isFocused: boolean;
  getIcon: (routeName: string, isFocused: boolean) => React.JSX.Element | null;
}

const TabButton: React.FC<TabButtonProps> = ({
  route,
  index,
  animatedIndex,
  navigation,
  isFocused,
  getIcon,
}) => {
  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      preventDefault: false,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const scaleAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedIndex.value,
      [index - 1, index, index + 1],
      [0.8, 1.1, 0.8],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabButton}
      activeOpacity={0.8}
    >
      <Animated.View style={scaleAnimatedStyle}>
        {getIcon(route.name, isFocused)}
      </Animated.View>
    </TouchableOpacity>
  );
};

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const animatedIndex = useSharedValue(0);

  useEffect(() => {
    animatedIndex.value = withSpring(state.index, {
      damping: 15,
      mass: 1,
      overshootClamping: false,
    });
  }, [state.index, animatedIndex]);

  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconSize = 24;
    const iconColor = isFocused ? COLORS.text : COLORS.green[500];

    const iconProps = { size: iconSize, color: iconColor };

    switch (routeName) {
      case 'Tab1':
        return <Icons.HomeIcon {...iconProps} />;
      case 'Tab2':
        return <Icons.ShoppingCartIcon {...iconProps} />;
      case 'Tab3':
        return <Icons.ChatBubbleLeftIcon {...iconProps} />;
      case 'Tab4':
        return <Icons.UserIcon {...iconProps} />;
      default:
        return null;
    }
  };

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            animatedIndex.value,
            [0, 1, 2, 3],
            [0, TAB_WIDTH, TAB_WIDTH * 2, TAB_WIDTH * 3],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarBackground}>
        <Animated.View
          style={[styles.activeIndicator, indicatorAnimatedStyle]}
        />

        {state.routes.map((route: any, index: number) => (
          <TabButton
            key={route.key}
            route={route}
            index={index}
            animatedIndex={animatedIndex}
            navigation={navigation}
            descriptors={descriptors}
            isFocused={state.index === index}
            getIcon={getIcon}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.dark[900],
  },
  tabBarBackground: {
    flexDirection: 'row',
    backgroundColor: COLORS.dark[800],
    borderRadius: 30,
    overflow: 'hidden',
    height: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeIndicator: {
    position: 'absolute',
    width: TAB_WIDTH,
    height: 60,
    backgroundColor: COLORS.green[600],
    borderRadius: 30,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;
