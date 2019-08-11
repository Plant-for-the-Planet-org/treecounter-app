export const loadState = () => {
  return new Promise(function(resolve, reject) {
    try {
      const serializedState = window.localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      resolve(JSON.parse(serializedState));
    } catch (err) {
      reject(err);
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
    const got = window.localStorage.getItem(key);
    if (got) {
      resolve(got);
    } else {
      reject(new Error(`${key} not in localStorage`));
    }
  });
};

export const clearStorage = () => {
  const sessionId = window.localStorage.getItem('session_id');
  window.localStorage.clear();
  window.localStorage.setItem('session_id', sessionId);
};
