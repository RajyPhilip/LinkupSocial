import { configureStore } from '@reduxjs/toolkit';
import { allUserReducer, postOfFollowingReducer, userReducer } from './Reducers/User';
import { likeReducer } from './Reducers/Post';

const store = configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUserReducer,
        like:likeReducer,
    }
});
export default store ;