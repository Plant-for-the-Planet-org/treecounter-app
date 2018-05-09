export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem('state', serializedState);
  } catch (err) {}
};

export const saveItem = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const fetchItem = key => {
  return window.localStorage.getItem(key);
};

export const clearStorage = () => {
  window.localStorage.clear();
};
