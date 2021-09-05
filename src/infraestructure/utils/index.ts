import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadIndex = async (): Promise<number | undefined> => {
  try {
    const value = await AsyncStorage.getItem(`@index`);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('error loading', e);
  }
};
export const saveIndex = async (value: number) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@index`, jsonValue);
  } catch (e) {
    console.log('error storing', e);
  }
};
