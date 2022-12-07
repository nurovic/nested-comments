/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { createPost } from "../../Redux/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import swal from "sweetalert";

const index = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (!comment) {
      return swal("Please Write Something...");
    }
    const data = {
      id: nanoid(),
      text: comment,
      user: user.name,
      time: new Date(),
      replies: [],
      likes: [],
    };
    dispatch(createPost(data));
    setComment("");
  };
  return (
    <div>
      {user.name ? (
        <form onSubmit={handleClick}>
          <input
            type="text"
            placeholder="Make Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      ) : null}
    </div>
  );
};

export default index;
