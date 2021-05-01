import { combineReducers } from 'redux';
// import UserReducer from './reducer-users';
import GetUsersReducer from './reducer-get-users';

const allReducers = combineReducers({
    // users: UserReducer,
    userList: GetUsersReducer
});

export default allReducers;