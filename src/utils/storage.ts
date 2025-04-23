// src/utils/storage.ts
import EncryptedStorage from 'react-native-encrypted-storage';

export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await EncryptedStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};