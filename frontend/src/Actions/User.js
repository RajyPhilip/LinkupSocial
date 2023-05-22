import axios from'axios' ;

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