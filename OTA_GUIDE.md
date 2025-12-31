# OTA Updates (EAS) Implementation Guide

This guide covers setting up and deploying Over-The-Air (OTA) updates using Expo EAS for a React Native CLI project.

## 🎯 Goal

Deploy hotfixes to your app instantly without waiting for App Store or Google Play Store review.

## 📋 Prerequisites

1. **EAS Account:** You must have an account at [expo.dev](https://expo.dev/). This is where your projects and updates will be managed.
2. **Existing React Native CLI Project.**
3. **EAS CLI:** Installed globally on your machine.
   ```bash
   npm install -g eas-cli
   ```

---

## 🛑 Step 1: Install Dependencies

Install the Expo core and the Updates module in your project root:

```bash
npx expo install expo expo-updates
```

> **Note for iOS:** After installation, run `cd ios && pod install` to link the native code.

---

## 🛠️ Step 2: Setup & Configuration

Run the following commands strictly in this order to configure your project.

### 1. Login to Expo

```bash
eas login
```

**What happens:** Authenticates your local machine with your Expo account.

### 2. Initialize Project

```bash
eas init
```

**What happens:**

- Asks to create a new project (Select **Yes**).
- Generates a unique `projectId` and writes it into your `app.json`.
- Links your local code to the Expo dashboard.

### 3. Configure Updates

```bash
eas update:configure
```

**What happens:**

- Configures `app.json` for OTA updates.
- Adds `updates.url` (the endpoint for JS bundles).
- Sets `runtimeVersion` policy (usually `"appVersion"`) to ensure compatibility.

### 4. Configure Build Profiles

```bash
eas build:configure
```

**What happens:**

- Creates `eas.json` in your root folder.
- Defines profiles like `development`, `preview`, and `production`.

---

## ⚙️ Step 3: Implementation (Code Setup)

To manage how updates are applied, we use a configuration utility.

### 1. Create the Config File

Create `src/config/OTAConfig.ts` and add the following code:

```typescript
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

export const OTA_CONFIG = {
  IS_ENABLED: !__DEV__, // Only enable OTA in production/preview builds
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
```

### 2. Initialize in App.tsx

Call the update checker when the app mounts and whenever it returns to the foreground. This ensures users get updates even if they leave the app open in the background for long periods.

```tsx
import React, { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
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

  // ... rest of your component
}
```

---

## 📲 Step 4: Create the "Staging" App

Before you can update the app, you need a build that is "listening" to a specific channel.

```bash
eas build --profile preview
```

**What happens:**

- Compresses and uploads source code to Expo's build servers.
- Compiles the Native Android APK or iOS IPA.
- **Action:** Download and install the resulting build on your device. This build is hardwired to listen to the `preview` channel.

---

## 🚀 Step 5: Push an OTA Update

Now you can push changes instantly without a full rebuild.

1. Make a change in your code (e.g., change a text string or color).
2. Run the update command:
   ```bash
   eas update --channel preview --platform android --message "Fix: Updated UI colors"
   ```

**Result:** When you open the app installed in Step 4, it will detect the update, download it, and restart with the new code.
