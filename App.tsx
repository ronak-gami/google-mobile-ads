import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from './src/utils/colors';
import { AdProvider } from './src/context/AdContext';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AdProvider>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor={COLORS.background}
            barStyle={'light-content'}
          />
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AdProvider>
    </GestureHandlerRootView>
  );
}

export default App;
