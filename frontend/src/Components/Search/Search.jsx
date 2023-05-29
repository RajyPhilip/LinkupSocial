import React, { useState } from 'react';
import './Search.css'
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import User from '../User/User';

const Search = () => {

    const {users,loading}=useSelector(state=>state.allUsers) ;
    const dispatch = useDispatch();
    // states 
    const [name,setName] = useState();
    // functions 
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(getAllUsers(name));
    }
  return (
    <div className='search'>
        <form className='searchForm' onSubmit={submitHandler}>
            <Typography>LinkUP Social</Typography>
            <input type='text' value={name}  required onChange={(e)=> setName(e.target.value)} />
            <Button disabled={loading} type='submit'>Search</Button>
            <div className='searchResults'>
                {
                    users && users.map((user)=>(
                        <User key={user._id} userId={user._id} name={user.name} avatar={user.avatar.url} />
                    ))
                }
            </div>
        </form>

    </div>
  )
}

export default Search ;