import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import './Login.css';
import { Typography,Button } from '@mui/material';
import {Link} from 'react-router-dom';
import { loginUser } from '../../Actions/User';

const Login = props => {

    //states
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();

    
    //functions
    const loginHandler=(e)=>{
        e.preventDefault();
        dispatch(loginUser(email,password));
    }
  return (
    <div className='login'>
        
        <form className='loginForm' onSubmit={loginHandler}  >
            <Typography variant='h3' style={{padding:"2vmax"}} >
                LinkUp Social
            </Typography>
            <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} required  />
            <input type="password" placeholder='Password'  onChange={(e)=>setPassword(e.target.value)} value={password
            } required  />
            <Link to='/forgot/password' >
                <Typography>Forgot Password</Typography>
            </Link>
            <Button type='submit'>Login</Button>
            <Link to='/register' >
                <Typography>New User?</Typography>
            </Link>
        </form>
    </div>
  )
}


export default Login ;