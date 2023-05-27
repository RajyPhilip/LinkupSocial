import React, { useEffect, useState } from 'react';
import './Register.css' ;
import { Avatar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Actions/User';
import { useAlert } from 'react-alert';

const Register = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    // states 
    const {loading,error} = useSelector((state)=> state.user) ;
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [avatar,setAvatar] = useState('');
    
    //function
    const handleImageChange = (e)=>{
        const file = e.target.files[0] ;
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = (e)=>{
            if(Reader.readyState === 2){
                setAvatar(Reader.result);
            }
        };
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(registerUser(name,email,password,avatar));
    }
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:'clearErrors'});
        }
    },[dispatch,alert,error])
  return (
    <div className='register'>
        <form onSubmit={submitHandler} className='registerForm'>
        <Typography variant='h3' style={{padding:"2vmax"}} >
                LinkUp Social
            </Typography>
            <Avatar src={avatar} alt='user' sx={{height:"10vmax",width:"10vmax"}} />
            <input type='file' accept='image/*' onChange={handleImageChange} />
            <input className='registerInputs' type="name" placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name} required  />
            <input className='registerInputs' type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} required  />
            <input className='registerInputs' type="password" placeholder='Password'  onChange={(e)=>setPassword(e.target.value)} value={password
            } required  />
            <Link to='/' ><Typography>Already a user ? Login Now</Typography> </Link>
            <Button disabled={loading} type='submit'>Sign Up</Button>
        </form>
    </div>
  )
}

export default Register