import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';
import mobileAds from 'react-native-google-mobile-ads';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      console.log('adapterStatuses: ', adapterStatuses);
    });

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
