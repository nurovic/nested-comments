import { nanoid } from "nanoid";
import React, { useState } from "react";
import { commentReply, likeComment, unLikeComment } from "../Redux/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import "./PostCard.css";
import swal from "sweetalert";

const PostCard = ({ comment, style }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const [show, setShow] = useState(true);
  const [isReplying, setIsReplyling] = useState(false);

  const { user } = useSelector((state) => state.user);
  const handleClick = (e) => {
    e.preventDefault();
    if (!reply.length) {
      return swal("Please write something");
    }
    const data = {
      commentId: comment.id,
      id: nanoid(),
      user: user.name,
      time: new Date(),
      text: reply,
      replies: [],
      likes: [],
    };
    dispatch(commentReply(data));
    setReply("");
  };

  const likeClick = (e) => {
    e.preventDefault();

    const check = comment.likes.includes(user.id);
    if (check) {
      const data = {
        commentId: comment.id,
        id: user.id,
      };
      dispatch(unLikeComment(data));
    } else {
      const data = {
        commentId: comment.id,
        id: user.id,
        user: user.name,
      };
      dispatch(likeComment(data));
    }
  };
  return (
    <div className="wrap-container">
      <div className="card-container" style={style}>
        <form className="card-detail">
          <div className="container-user">
            <h1>{comment.user}</h1>
          </div>
          <div className="container-text">
            <p>{comment.text}</p>
          </div>
          <div className="time-reply">
            <div className="text-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ height: 20, marginRight: 10 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              <div className="text-like" onClick={likeClick}>
                {comment.likes.length > 0 ? comment.likes.length : ""} Like
              </div>

              <div
                onClick={() => setIsReplyling(!isReplying)}
                className="sub-comments"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ height: 20, marginRight: 10 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>

                <div>Reply</div>
              </div>
              <p>
                {comment.replies.length == 0
                  ? ""
                  : comment.replies.length + " " + "Replies"}
              </p>
            </div>
            <p>{comment.time.getHours() + ":" + comment.time.getMinutes()}</p>
          </div>
          {isReplying ? (
            <div className="comment-container">
              <input
                className="comment-input"
                type="text"
                placeholder="Make Comment"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className="buttons">
                <button onClick={handleClick} type="submit">
                  Send
                </button>
              </div>
            </div>
          ) : null}
        </form>
        <span onClick={() => setShow(!show)} className="sub-comments">
          {comment.replies.length > 0
            ? show
              ? "Hide Replies"
              : "Show Replies"
            : null}
        </span>
        {show
          ? comment.replies?.map((comment) => (
              <div className="nested-comments">
                <PostCard
                  key={comment.id}
                  comment={comment}
                  style={{ width: `98%` }}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default PostCard;
