import { MMKVLoader } from 'react-native-mmkv-storage';

const mmkv = new MMKVLoader().initialize();

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = mmkv.getString(TOKEN_KEY);
    return token || null;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const token = mmkv.getString(REFRESH_TOKEN_KEY);
    return token || null;
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
};

export const saveTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  try {
    mmkv.setString(TOKEN_KEY, accessToken);
    mmkv.setString(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.error('Failed to save tokens:', error);
  }
};

export const clearTokens = async (): Promise<void> => {
  try {
    mmkv.removeItem(TOKEN_KEY);
    mmkv.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to clear tokens:', error);
  }
};
