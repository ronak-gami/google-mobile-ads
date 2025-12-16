import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import mobileAds from 'react-native-google-mobile-ads';

mobileAds()
  .setRequestConfiguration({
    testDeviceIdentifiers: ['R9ZT20CC7XH', 'EMULATOR'],
  })
  .then(() => {
    console.log('Ad request configuration set');
  });

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('Google Mobile Ads initialized:', adapterStatuses);
  })
  .catch(error => {
    console.error('Failed to initialize Google Mobile Ads:', error);
  });

AppRegistry.registerComponent(appName, () => App);
