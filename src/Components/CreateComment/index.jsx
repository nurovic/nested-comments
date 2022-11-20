/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { createPost } from '../../Redux/PostSlice'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

const index = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const [comment, setComment] = useState("")


    const handleClick = (e) => {
        e.preventDefault()
        if(!user.name){
            return alert("Please Enter Your Name...")
        }
        if(!comment){
            return alert("Please Write Something...")
        }
        const data = {
            id: nanoid(),
            text: comment,
            user: user.name,
            time: new Date().toLocaleTimeString(),
            replies: [],
            likes: [],
        }
        dispatch(createPost(data))
        setComment("")
    }
  return (
    <div>
        <form onSubmit={handleClick}>
            <input 
            type="text" 
            placeholder='Make Comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
        </form>
    </div>
  )
}

export default index