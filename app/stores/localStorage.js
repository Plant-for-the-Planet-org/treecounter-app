export const loadState = () => {
  return new Promise(function(resolve, reject) {
    try {
      const serializedState = window.localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      resolve(JSON.parse(serializedState));
    } catch (err) {
      reject(null);
    }
  });
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
  return new Promise(function(resolve, reject) {
    if (window.localStorage.getItem(key)) {
      resolve(window.localStorage.getItem(key));
    } else {
      reject(Error('Key not found'));
    }
  });
};

export const clearStorage = () => {
  window.localStorage.clear();
};
