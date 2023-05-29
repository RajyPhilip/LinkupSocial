import React from 'react';
import './CommentCard.css';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deletecommentOnPost } from '../../Actions/Post';
import { getFollowingPosts, getMyPosts } from '../../Actions/User';

const CommentCard = ({userId,name,avatar,comment,commentId,postId,isAccount}) => {
    const dispatch = useDispatch();
    //states
    const {user} = useSelector(state=>state.user);
    //functions
    const deleteCommentHandle = ()=>{
        dispatch(deletecommentOnPost(postId,commentId));
        if(isAccount){
            dispatch(getMyPosts());
        }else{
            dispatch(getFollowingPosts());
        }
    }

  return (
    <div className='commentUser'>
        <Link to={`/user/${userId}`}>
            <img src={avatar} alt={name} />
            <Typography style={{minWidth:"6vmax"}} >{name}</Typography>
        </Link>
        <Typography>
            {comment}
        </Typography>
        {
            isAccount ? (<Button onClick={deleteCommentHandle} >
            <Delete />
        </Button>) : userId === user._id ? (<Button onClick={deleteCommentHandle} >
            <Delete />
        </Button>) : null
        }
    </div>
  )
}

export default CommentCard ;