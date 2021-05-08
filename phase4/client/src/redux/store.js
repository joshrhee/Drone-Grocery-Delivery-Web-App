import { createStore, applyMiddleware } from 'redux';
import reducer from './subscribers/reducer.js'
import logger from 'redux-logger';

const store = createStore(reducer, applyMiddleware(logger));
console.log("Initial state is: ", store.getState());

export default store;