import { legacy_createStore as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools());

export default store;