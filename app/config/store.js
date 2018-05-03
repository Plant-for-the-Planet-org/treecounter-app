import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

const middleware = []
if(process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;