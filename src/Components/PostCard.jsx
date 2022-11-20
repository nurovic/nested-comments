import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import {commentReply, likeComment, unLikeComment} from '../Redux/PostSlice'
import { useDispatch, useSelector } from 'react-redux'
import './PostCard.css'

const PostCard = ({comment}) => {
  const dispatch = useDispatch()
  const [reply, setReply] = useState("")
  const [show, setShow] = useState(true)
  const {user} = useSelector(state => state.user)
  const handleClick = (e) => {
    e.preventDefault()
    if(!reply.length){
      return alert("Please write something")
    }
    const data = {
      commentId: comment.id,
      id: nanoid(),
      user:user.name,
      time: new Date(),
      text:reply,
      replies: [],
      likes: []
    }
    dispatch(commentReply(data))
    setReply("")
  }

  const likeClick = (e) => {
    e.preventDefault()

    const check = comment.likes.includes(user.id)
    if(check){
      const data = {
        commentId: comment.id,
        id: user.id,
      }
      dispatch(unLikeComment(data))
    }
    else {
      const data = {
        commentId: comment.id,
        id: user.id,
        user: user.name
      }
      dispatch(likeComment(data))
    }

  }
  return (
    <div className='wrap-container'>
      <div className="card-container">
        <form className='card-detail'>
          <div className='container-user'>
            <h1>{comment.user}</h1>
          </div>
          <div className="container-text">
          <p>{comment.text}</p>

          </div>
      <div className='time-reply'>
      <p>{comment.time.getHours() + ":" + comment.time.getMinutes()}</p> 
          <p>
            {comment.replies.length == 0 ? 
            "" :
            comment.replies.length + " " + "Replies"
          }
          </p>
      </div>
          <input 
          className='comment-input'
          type="text" 
          placeholder='Make Comment'
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          />
        <div className="buttons">
        <button onClick={handleClick} type="submit">Send</button>
          <button
          onClick={likeClick}
          >{comment.likes.length > 0 ? comment.likes.length : "" } Like</button>
        </div>
        </form>
        <span onClick={() => setShow(!show)} className='sub-comments'> 
        
        { comment.replies.length > 0 ? (show ? "Hide Replies" : "Show Replies"): null}

        </span>
    {show ? 
      comment.replies?.map((comment) => (
        <PostCard key={comment.id} comment={comment}/>
      ))
      :
      null
    }

    </div>
    </div>
  )
}

export default PostCard