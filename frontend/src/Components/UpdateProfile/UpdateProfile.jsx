import React, { useEffect, useState } from 'react';
import './UpdateProfile.css' ;
import { Avatar, Button, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../Actions/User';
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    // states 
    const {loading,error,user} = useSelector((state)=> state.user) ;
    const {loading:updateLoading,error:updateError,message} = useSelector((state)=> state.like) ;

    const [name,setName] = useState(user.name);
    const [email,setEmail] = useState(user.email);
    const [avatar,setAvatar] = useState('');
    const [avatarPrev,setAvatarPrev] = useState(user.avatar.url);

    
    //function
    const handleImageChange = (e)=>{
        const file = e.target.files[0] ;
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = (e)=>{
            if(Reader.readyState === 2){
                setAvatarPrev(Reader.result);
                setAvatar(Reader.result);

            }
        };
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        await dispatch(updateProfile(name,email,avatar));
        dispatch(loadUser())
    }
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:'clearErrors'});
        }
        if(updateError){
            alert.error(updateError);
            dispatch({type:'clearErrors'});
        }
        if(message){
            alert.success(message);
            dispatch({type:'clearMessage'});
        }
    },[dispatch,alert,error,updateError,message])
  return loading ? (
    <Loader />
  ) : (
    <div className='updateProfile'>
        <form onSubmit={submitHandler} className='updateProfileForm'>
        <Typography variant='h3' style={{padding:"2vmax"}} >
                LinkUp Social
            </Typography>
            <Avatar src={avatarPrev} alt='user' sx={{height:"10vmax",width:"10vmax"}} />
            <input type='file' accept='image/*' onChange={handleImageChange} />
            <input className='updateProfileInputs' type="name" placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name} required  />
            <input className='updateProfileInputs' type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} required  />
            <Button disabled={updateLoading} type='submit'>Update</Button>
        </form>
    </div>
  )
}

export default UpdateProfile ;