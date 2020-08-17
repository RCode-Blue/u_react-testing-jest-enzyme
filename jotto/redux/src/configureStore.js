import {createStore} from 'redux';
import rootReducer from './reducers/index';

// console.log(rootReducer);
export default createStore(rootReducer);
