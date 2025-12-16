import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

// IMPORTANT: Replace these with your REAL Ad Unit IDs from AdMob Console
// Get them from: https://apps.admob.com/
const PRODUCTION_AD_UNITS = {
  ios: {
    banner: 'ca-app-pub-xxxxx/xxxxx',
    interstitial: 'ca-app-pub-xxxxx/xxxxx',
    rewarded: 'ca-app-pub-xxxxx/xxxxx',
  },
  android: {
    banner: 'ca-app-pub-9139685486639860/1427754352',
    interstitial: 'ca-app-pub-9139685486639860/3771024277',
    rewarded: 'ca-app-pub-9139685486639860/6536610805',
  },
};

// Use test ads in __DEV__ mode, real ads in production
const isTestMode = __DEV__;

// export const AD_UNITS = {
//   BANNER: isTestMode
//     ? TestIds.BANNER
//     : Platform.OS === 'ios'
//     ? PRODUCTION_AD_UNITS.ios.banner
//     : PRODUCTION_AD_UNITS.android.banner,

//   INTERSTITIAL: isTestMode
//     ? TestIds.INTERSTITIAL
//     : Platform.OS === 'ios'
//     ? PRODUCTION_AD_UNITS.ios.interstitial
//     : PRODUCTION_AD_UNITS.android.interstitial,

//   REWARDED: isTestMode
//     ? TestIds.REWARDED
//     : Platform.OS === 'ios'
//     ? PRODUCTION_AD_UNITS.ios.rewarded
//     : PRODUCTION_AD_UNITS.android.rewarded,
// };

export const AD_UNITS = {
  BANNER: TestIds.BANNER,
  INTERSTITIAL: TestIds.INTERSTITIAL,
  REWARDED: TestIds.REWARDED,
};
