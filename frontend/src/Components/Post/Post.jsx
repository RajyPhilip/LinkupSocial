import { Avatar, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import{MoreVert,Favorite,FavoriteBorder,ChatBubbleOutline,DeleteOutline} from '@mui/icons-material';
import './Post.css' ;

const Post = ({postId,caption,postImage,likes=[],comments=[],ownerImage,ownerName,ownerId,isDelete=false,isAccount=false,
}) => {
    //state
    const[liked,setLiked] = useState(false);
    //functions
    const handleLike = ()=>{
        setLiked(!liked);
        //api request
    }

  return (
    <div className='post'>
        <div className="postHeader">
            {isAccount ? <Button>
                <MoreVert />
            </Button> : null}
        </div>
        <img src={postImage} alt='Post' />
        <div className="postDetails">
            <Avatar src={ownerImage} alt='User' sx={{height:"3vmax",width:"3vmax"}} />
            <Link to={`/user/${ownerId}`} >
                <Typography fontWeight={700} >{ownerName}</Typography>
            </Link>
            <Typography fontWeight={100} color="rgba(0,0,0,0.582" style={{alignSelf:"center"}} >{caption}</Typography>
        </div>
        <button className='post-like-btn'>
            <Typography>{likes + 1}</Typography>    
        </button>
        <div className="postFooter">
            <Button onClick={handleLike}>
                { liked ? <Favorite style={{color
                :"red"}} /> : <FavoriteBorder /> }
            </Button>
            <Button>
                <ChatBubbleOutline />
            </Button>
            {
                isDelete ? <Button>
                <DeleteOutline />
            </Button> : null
            }
        </div>
    </div>
  )
}

export default Post ;