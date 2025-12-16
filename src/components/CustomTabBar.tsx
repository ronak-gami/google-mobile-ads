import React, { useReducer } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import * as Icons from 'react-native-heroicons/solid';
import { COLORS } from '../utils/colors';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface TabButtonProps {
  route: any;
  active: boolean;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
  getIcon: (routeName: string, isFocused: boolean) => React.JSX.Element | null;
}

const TabButton: React.FC<TabButtonProps> = ({
  route,
  active,
  onLayout,
  onPress,
  getIcon,
}) => {
  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onLayout={onLayout}
      style={styles.component}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[
          styles.iconContainer,
          animatedIconContainerStyles,
          active && { top: 0 },
        ]}
      >
        {getIcon(route.name, active)}
      </Animated.View>
    </TouchableOpacity>
  );
};

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const activeIndex = state.index;

  const reducer = (state: any, action: { x: number; index: number }) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== state.routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconSize = 28;
    const iconColor = isFocused ? COLORS.white : COLORS.secondary;

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

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={COLORS.dark[900]}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {state.routes.map((route: any, index: number) => {
          const active = index === activeIndex;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              preventDefault: false,
            });

            if (!active && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabButton
              key={route.key}
              route={route}
              active={active}
              onLayout={e => handleLayout(e, index)}
              onPress={onPress}
              getIcon={getIcon}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    height: 60,
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: COLORS.accent,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;
