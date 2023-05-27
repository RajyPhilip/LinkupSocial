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
export const getAllUsers =()=> async(dispatch)=>{
    try {
        dispatch({
            type:"allUserRequest",
        });
        const {data}= await axios.get('api/v1/users');
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
