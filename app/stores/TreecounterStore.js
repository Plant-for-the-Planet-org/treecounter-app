import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";

import reducers from "../reducers";
import {initialState as entitiesState} from "../reducers/entitiesReducer";
import logger from 'redux-logger';

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
export default function configureStore(props, context) {

  const {locale, mediaPath} = props;
  const {scheme, host, base: baseUrl, location} = context;

  const initialState = {
    serverName: `${scheme}://${host}`,
    baseUrl,
    location, // TODO: probably obsolete
    serverRendered: context.hasOwnProperty('serverSide'),
    mediaPath,
    locale,
    entities: entitiesState,
    ...props
  };

  // use devtools if we are in a browser and the extension is enabled
  const composeEnhancers = typeof window !== 'undefined' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

  const middlewares = [thunkMiddleware];
  if ((process.env.ENV || process.env.NODE_ENV) === 'development') {
    middlewares.push(logger);
  }
  return createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}
