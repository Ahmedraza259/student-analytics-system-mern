// store.js
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/index'; 
import thunk from 'redux-thunk'; 

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
