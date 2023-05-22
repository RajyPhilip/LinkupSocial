import { configureStore } from '@reduxjs/toolkit';
import { postOfFollowingReducer, userReducer } from './Reducers/User';
const initialState = {};
const store = configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        
    }
});
export default store ;