import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {getAllUsers, getFollowingPosts, getMyPosts, logoutUser} from '../../Actions/User' ;
import './Account.css';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import User from '../User/User';

const Account = () => {

  const dispatch = useDispatch();
  const alert=useAlert();

  //states
  const {user,loading:userLoading} = useSelector((state)=> state.user);
  const {loading,error,posts} = useSelector((state)=> state.myPosts);
  const {error:likeError,message} = useSelector((state)=>state.like);

  const [followersToggle,setFollowersToggle] = useState(false);
  const [followingToggle,setFollowingToggle] = useState(false);


  // functions

  const logoutHandler = async()=>{
    await dispatch(logoutUser());
    alert.success("Logged out Successfully");
  }



  useEffect(()=>{
    dispatch(getMyPosts());
  },[dispatch])

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch({type:"clearErrors"})
  }
  if(likeError){
    alert.error(likeError);
    dispatch({type:"clearErrors"})
  }
  if(message){
      alert.success(message)
      dispatch({type:"clearMessage"});
  }
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  },[dispatch,alert,message,error,likeError,]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) :(
    <div className='account'>
        <div className="accountleft">
          {
            posts && posts.length > 0 ? posts.map(post =>(
              <Post key={post._id} postId={post._id}  postImage={post.image.url} likes={post.likes} comments={post.comments} ownerImage={'post.owner.avatar.url'} ownerName={post.owner.name} ownerId={post.owner._id} caption={post.caption} isAccount={true} isDelete={true}  />
            )) : <Typography variant='h2'>You have not posted yet </Typography>
          }

        </div>
        <div className="accountright">
            <Avatar sx={{height:"8vmax",width:"8vmax"}} src="https://images.unsplash.com/photo-1684867354840-bd5bcf5c377b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" />
            <Typography variant='h5'>{user.name}</Typography>

            <div>
              <button onClick={()=>setFollowersToggle(!followersToggle)} style={{cursor:"pointer"}}>
                <Typography style={{cursor:"pointer"}}>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>
            <div>
              <button onClick={()=>setFollowingToggle(!followingToggle)} style={{cursor:"pointer"}}>
                <Typography style={{cursor:"pointer"}}>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>
            <div>
              <Typography >Posts</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>
            <Button variant='contained' onClick={logoutHandler} >Logout</Button>
            <Link to='/update/profile'>Edit Profile</Link>
            <Link to='/update/password'>Change Password</Link>
            <Button variant='text' style={{color:"red",margin:"2vmax"}} >Delete My PROFILe</Button>

            <Dialog open={followersToggle} onClose={()=>setFollowersToggle(!followersToggle)} >
            <div className="DialogBox">
                <Typography variant='h4'> Followers</Typography>
                {
                  user && user.followers.length > 0 ? user.followers.map((follower) => (
                    <User key={follower._id} userId={follower._id} name={follower.name} avatar={follower.avatar.url} />
                  )) :<Typography style={{margin:"2vmax"}}>You have no followers</Typography>
                }
            </div>
        </Dialog>

        <Dialog open={followingToggle} onClose={()=>setFollowingToggle(!followingToggle)} >
            <div className="DialogBox">
                <Typography variant='h4'> Following</Typography>
                {
                  user && user.following.length > 0 ? user.following.map((follow) => (
                    <User key={follow._id} userId={follow._id} name={follow.name} avatar={follow.avatar.url} />
                  )) :<Typography style={{margin:"2vmax"}}>You are  not following anyone</Typography>
                }
            </div>
        </Dialog>

        </div>
    </div>
  )
}

export default Account