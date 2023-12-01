
/**
 * Redux root store define here
 * our all reducer method pass it through store
 */

import { createStore } from 'redux';
import rootReducers from './root_Reducer';

//define our store with all reducers
const store = createStore(rootReducers);


export default store;
