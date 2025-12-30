import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

export const OTA_CONFIG = {
  IS_ENABLED: !__DEV__,
  UPDATE_MODE: 'manual' as 'auto' | 'manual',
};

export const checkAndApplyUpdates = async () => {
  if (!OTA_CONFIG.IS_ENABLED) {
    return;
  }

  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      if (OTA_CONFIG.UPDATE_MODE === 'auto') {
        // Download and reload immediately
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } else {
        // Manual mode: Download then ask user
        await Updates.fetchUpdateAsync();
        Alert.alert(
          'Update Available',
          'A new version of the app is available. Please restart the app to apply the update.',
          [
            {
              text: 'Restart Now',
              onPress: async () => {
                await Updates.reloadAsync();
              },
            },
          ],
          { cancelable: false },
        );
      }
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
};
