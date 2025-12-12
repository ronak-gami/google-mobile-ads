import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import * as Icons from 'react-native-heroicons/solid';
import { COLORS } from '../utils/colors';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;

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
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    });
  }, [state.index, animatedIndex]);

  const getIcon = (routeName: string) => {
    const iconSize = 24;
    const iconColor = COLORS.green[500];

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

        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

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
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <Animated.View style={scaleAnimatedStyle}>
                {getIcon(route.name)}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
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
    borderRadius: 20,
    overflow: 'hidden',
    height: 70,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  activeIndicator: {
    position: 'absolute',
    width: TAB_WIDTH,
    height: 70,
    backgroundColor: COLORS.green[600],
    borderRadius: 20,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;

        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

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
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <Animated.View style={scaleAnimatedStyle}>
                {getIcon(route.name)}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
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
    borderRadius: 20,
    overflow: 'hidden',
    height: 70,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  activeIndicator: {
    position: 'absolute',
    width: TAB_WIDTH,
    height: 70,
    backgroundColor: COLORS.green[600],
    borderRadius: 20,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;
