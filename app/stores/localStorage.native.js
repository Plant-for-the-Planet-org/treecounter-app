import { AsyncStorage } from 'react-native';

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = async state => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('state', serializedState);
  } catch (err) {}
};

export const saveItem = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const fetchItem = async key => {
  try {
    const serializedState = await AsyncStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return serializedState;
  } catch (err) {
    return undefined;
  }
};

export const clearStorage = async () => {
  await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
};
