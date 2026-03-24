import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TabNavigator from './src/navigation/TabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from './src/utils/colors';
import { AdProvider } from './src/context/AdContext';
import { store, persistor } from './src/store';

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
