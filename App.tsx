import React, { useEffect } from 'react';
import { StatusBar, AppState, AppStateStatus } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from './src/utils/colors';
import { AdProvider } from './src/context/AdContext';
import { checkAndApplyUpdates } from './src/config/OTAConfig';

function App() {
  useEffect(() => {
    // 1. Check on App Launch
    checkAndApplyUpdates();

    // 2. Check when App comes to Foreground (Resume)
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') {
          checkAndApplyUpdates();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

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
