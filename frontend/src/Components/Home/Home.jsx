import React, { useEffect } from 'react';
import{useDispatch} from 'react-redux';
import './Home.css';
import User from '../User/User';
import Post from '../Post/Post';
import { getFollowingPosts } from '../../Actions/User';

const Home = () => {

  const dispatch = useDispatch();

  // functions 
  useEffect(()=>{
    dispatch(getFollowingPosts());
  },[]);
  
  return (
    <div className='home'>
        <div className='homeleft'>
          <Post postImage={"https://plus.unsplash.com/premium_photo-1683639447442-164725904c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"} ownerName={"RAjyphilip"} caption={"this is a sample post"}   />
        </div>

        <div className='homeright'>
          <User userId={"user._id"} name={"user.name"} avatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTgqkIW1GcSvOy7Dg34gKaPsOq_8a6-aEwQ&usqp=CAU"} />
        </div>

    </div>
  )
}

export default Home ;