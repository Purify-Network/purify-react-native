import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {}
  };

  export const _retrieveData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log(value);
      }
    } catch (error) {}
  };
