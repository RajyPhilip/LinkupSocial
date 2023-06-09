import axios from'axios' ;

//Register user
export const registerUser = (name,email,password,avatar)=> async (dispatch)=>{
    try {
        dispatch({
            type:"RegisterRequest"
        })
        const {data}  = await axios.post('/api/v1/register',{name,email,password,avatar},{
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch({
            type:"RegisterSuccess",
            payload:data.user
        })

    } catch (error) {
        dispatch({
            type:"RegisterFailure",
            payload:error.response.data.message
        })
    }
}

//login user
export const loginUser = (email,password)=> async (dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        })
        const {data}  = await axios.post('/api/v1/login',{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })

    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload:error.response.data.message
        })
    }
}
//logout user
export const logoutUser = ()=> async (dispatch)=>{
    try {
        dispatch({
            type:"LogoutUserRequest"
        })
        const {data}  = await axios.get('/api/v1/logout');

        dispatch({
            type:"LogoutUserSuccess",
        })

    } catch (error) {
        dispatch({
            type:"LogoutUserFailure",
            payload:error.response.data.message
        })
    }
}


//load user 
export const loadUser = ()=> async (dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        })
        const {data}  = await axios.get('/api/v1/me');
        dispatch({
            type:"LoadUserSuccess",
            payload:data.user
        })

    } catch (error) {
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.message
        })
    }
}
//posts of the users the current user is following 
export const getFollowingPosts =()=> async(dispatch)=>{
    try {
        dispatch({
            type:"postOfFollowingRequest",
        });
        const {data}= await axios.get('api/v1/posts');
        dispatch({
            type:"postOfFollowingSuccess",
            payload:data.posts,
        });
    } catch (error) {
        dispatch({
            type:"postOfFollowingFailure",
            payload: error.response.data.message
        })
    }
}
//get all users
export const getAllUsers =(name='')=> async(dispatch)=>{
    try {
        dispatch({
            type:"allUserRequest",
        });
        const {data}= await axios.get(`api/v1/users?name=${name}`);
        dispatch({
            type:"allUserSuccess",
            payload:data.users,
        });
    } catch (error) {
        dispatch({
            type:"allUserFailure",
            payload: error.response.data.message
        })
    }
}
//posts of the current user 
export const getMyPosts =()=> async(dispatch)=>{
    try {
        dispatch({
            type:"myPostsRequest",
        });
        const {data}= await axios.get('api/v1/my/posts');
        dispatch({
            type:"myPostsSuccess",
            payload:data.posts,
        });
    } catch (error) {
        dispatch({
            type:"myPostsFailure",
            payload: error.response.data.message
        })
    }
}
//update profile 
export const updateProfile = (name,email,avatar)=> async (dispatch)=>{
    try {
        dispatch({
            type:"updateProfileRequest"
        })
        const {data}  = await axios.put('/api/v1/update/profile',{name,email,avatar},{
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch({
            type:"updateProfileSuccess",
            payload:data.user
        })

    } catch (error) {
        dispatch({
            type:"updateProfileFailure",
            payload:error.response.data.message
        })
    }
}
//delete profile 
export const deleteMyProfile = ()=> async (dispatch)=>{
    try {
        dispatch({
            type:"deleteProfileRequest"
        })
        const {data}  = await axios.delete('/api/v1/delete/me');
        dispatch({
            type:"deleteProfileSuccess",
            payload:data.user
        })

    } catch (error) {
        dispatch({
            type:"deleteProfileFailure",
            payload:error.response.data.message
        })
    }
}
//posts of the current user 
export const getUserPosts =(id)=> async(dispatch)=>{
    try {
        dispatch({
            type:"userPostsRequest",
        });
        const url = `/api/v1/userposts/${id}` ;
        const response= await axios.get(url);
        const userPosts = response.data.posts
        dispatch({
            type:"userPostsSuccess",
            payload:userPosts,
        });
    } catch (error) {
        dispatch({
            type:"userPostsFailure",
            payload: error.response.data.message
        })
    }
}
//posts of the current user 
export const getUserProfile =(id)=> async(dispatch)=>{
    try {
        dispatch({
            type:"userProfileRequest",
        });
        const url =  `/api/v1/user/${id}` ;
        const {data}= await axios.get(url);
        dispatch({
            type:"userProfileSuccess",
            payload:data.user,
        });
    } catch (error) {
        dispatch({
            type:"userProfileFailure",
            payload: error.response.data.message
        })
    }
}
export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "followUserRequest",
        });
        const { data } = await axios.get(`/api/v1/follow/${id}`);
        dispatch({
            type: "followUserSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message,
        });
    }
};