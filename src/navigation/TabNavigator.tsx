import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tab1Screen from '../screens/Tab1Screen';
import Tab2Screen from '../screens/Tab2Screen';
import Tab3Screen from '../screens/Tab3Screen';
import Tab4Screen from '../screens/Tab4Screen';
import CustomTabBar from '../components/CustomTabBar';
import { COLORS } from '../utils/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.dark[900],
          borderTopWidth: 0,
        },
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Tab1"
        component={Tab1Screen}
        options={{
          title: 'tab-1',
          tabBarLabel: 'Tab-1',
        }}
      />
      <Tab.Screen
        name="Tab2"
        component={Tab2Screen}
        options={{
          title: 'tab-2',
          tabBarLabel: 'Tab-2',
        }}
      />
      <Tab.Screen
        name="Tab3"
        component={Tab3Screen}
        options={{
          title: 'tab-3',
          tabBarLabel: 'Tab-3',
        }}
      />
      <Tab.Screen
        name="Tab4"
        component={Tab4Screen}
        options={{
          title: 'tab-4',
          tabBarLabel: 'Tab-4',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
