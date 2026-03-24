import MMKVStorage from "react-native-mmkv-storage";

const MMKV = new MMKVStorage.Loader().initialize();

export const reduxPersistStorage = {
  setItem: (key: string, value: string): Promise<void> => {
    MMKV?.setString(key, value);
    return Promise.resolve();
  },
  getItem: (key: string): Promise<string | null> => {
    const value = MMKV?.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: (key: string): Promise<void> => {
    MMKV?.removeItem(key);
    return Promise.resolve();
  },
};
 