import { configureStore } from '@reduxjs/toolkit';
import { allUserReducer, postOfFollowingReducer, userProfileReducer, userReducer } from './Reducers/User';
import { likeReducer,myPostReducer, userPostsReducer } from './Reducers/Post';

const store = configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUserReducer,
        like:likeReducer,
        myPosts:myPostReducer,
        userProfile:userProfileReducer,
        userPosts:userPostsReducer
    }
});
export default store ;