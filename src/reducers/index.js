import { combineReducers } from 'redux';
import loginReducer from './login';
import searchReducer from './search';

const rootReducer = combineReducers({
    login: loginReducer,
    search: searchReducer
});

export default rootReducer;
