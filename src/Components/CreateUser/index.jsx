/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { login } from '../../Redux/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

const index = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
 
    const [userName, setUserName] = useState("")
    const handleClick = (e) => {
        e.preventDefault()
        const data = {
            id: nanoid(),
            name:userName
        }
        dispatch(login(data))
        setUserName("")
    }
  return (
    <div>
        {
            user.name 
            ?
            null
            :        
            <h3 className='user-notification'>Please Enter Name</h3>


        }
        <form onSubmit={handleClick}>
            <input 
            type="text" 
            placeholder='Name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
        </form>
        <h2>
            {
                user.name ? "Name:" + " " +  user.name : ""
            }
        </h2>
    </div>
  )
}

export default index