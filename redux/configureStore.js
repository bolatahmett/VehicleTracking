import { combineReducers } from 'redux';
import rootReducer from './reducers/index';
var reducers = combineReducers({
    rootReducer: rootReducer,
});
export default reducers;
