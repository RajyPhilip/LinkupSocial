import { configureStore } from '@reduxjs/toolkit';
import { allUserReducer, postOfFollowingReducer, userReducer } from './Reducers/User';
const initialState = {};
const store = configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUserReducer,
    }
});
export default store ;