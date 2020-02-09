import AsyncStorage from '@react-native-community/async-storage';
import { debug } from '../debug';

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
  } catch (err) {
    debug(err);
  }
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

/**
 * Get a possibly unset localStorage item.
 * Use this when it is not an error for the item to be unset.
 *
 * @returns string | null
 */
export const getItem = async key => {
  return await AsyncStorage.getItem(key);
};
export const getItemSync = async key => {
  return await AsyncStorage.getItem(key);
};
export const clearStorage = async () => {
  //const welcomeKey = await fetchItem('welcome');
  //debug(welcomeKey);
  await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
  //saveItem('welcome', welcomeKey);
};
