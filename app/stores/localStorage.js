import { debug } from '../debug';

const FIREFOX_STORAGE_ERROR = 'Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to "Everything". This will remove the corrupted browser storage across all sites.'

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
  } catch(err) {
    if(err.name == 'NS_ERROR_FILE_CORRUPTED') {
      console.error(FIREFOX_STORAGE_ERROR);
    } else {
      debug(err);
    }
  }
};

export const saveItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch(err) {
    if(err.name == 'NS_ERROR_FILE_CORRUPTED') {
      console.error(FIREFOX_STORAGE_ERROR);
    } else {
      debug(err);
    }
  }
};

export const fetchItem = key => {
  return new Promise(function(resolve, reject) {
    const got = window.localStorage.getItem(key);
    if (got === null) {
      reject(new Error(`${key} not in localStorage`));
    } else {
      resolve(got);
    }
  });
};

/**
 * Get a possibly unset localStorage item.
 * Use this when it is not an error for the item to be unset.
 *
 * @returns string | null
 */
export const getItem = async key => {
  return window.localStorage.getItem(key);
};
export const getItemSync = key => {
  return window.localStorage.getItem(key);
};
export const clearStorage = () => {
  const sessionId = window.localStorage.getItem('session_id');
  try {
    window.localStorage.clear();
    window.localStorage.setItem('session_id', sessionId);
  } catch(err) {
    if(err.name == 'NS_ERROR_FILE_CORRUPTED') {
      console.error(FIREFOX_STORAGE_ERROR);
    } else {
      debug(err);
    }
  }
};
