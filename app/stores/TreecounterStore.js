import { createStore, applyMiddleware, compose } from 'redux';
import Reactotron from '../../ReactotronConfig';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import middlewares from './middlewares';
import initialState from './storeInitialState';

import { initialState as entitiesState } from '../reducers/entitiesReducer';
import reducers from '../reducers/reducer';
/**
 * This function will be called in App.js by either:
 *   1. ReactOnRails.registerStore({ TreecounterStore: configureStore }) and receive props and context created by Symfony
 *   2. a direct call: configureStore(initialProps, context) passing props and context from a config file
 * The fact whether the context contains the key 'serverSide' can be used to determine if the app is being initialized
 * via symfony (1. 'serverSide' is defined) or from a local index.html file (2. 'serverSide' is not defined).
 *
 * @see app/config/index.js for a description of the parameters
 *
 * @param props initial data from Symfony or config
 * @param context server environment provided by either Symfony or config
 * @returns {Store}
 */
export default function configureStore() {
  const commonInitialState = {
    ...initialState,
    entities: entitiesState
  };

  // use devtools if we are in a browser and the extension is enabled
  const composeEnhancers =
    typeof window !== 'undefined' &&
    // eslint-disable-next-line no-underscore-dangle
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

  let middleware = [...middlewares, thunkMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }

  return createStore(
    reducers,
    commonInitialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      Reactotron.createEnhancer()
    )
  );
}
