import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/actions/postActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPost = () => {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const dispatch = useDispatch(null);
  const navigate = useNavigate();
  const oldPosts = useSelector((state) => state.allPosts.posts);
  const userId = localStorage.getItem("userID");
  const getLastPostID = oldPosts.reduce(
    (acc, post) => (acc = acc > post.id ? acc : post.id),
    0
  );
  const submitPostForm = (event) => {
    event.preventDefault();

    if (titleRef.current.value.length === 0) {
      titleRef.current.focus();
    } else if (bodyRef.current.value.length === 0) {
      bodyRef.current.focus();
    } else {
      const getText = titleRef.current.value;
      const getBody = bodyRef.current.value;

      const body = {
        userId: parseInt(localStorage.getItem("userID")),
        id: getLastPostID + 1,
        title: getText,
        body: getBody,
      };

      const headers = {
        "Content-type": "application/json; charset=UTF-8",
      };

      const response = axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body,
          headers,
        })
        .then((res) => {
          const newPosts = oldPosts.push(res.data.body);
          dispatch(setPosts(oldPosts));
          navigate(`/user/${userId}`);
        });
    }
  };

  return (
    <div className="row">
      <div className="col-lg-3"></div>
      <div className="col-lg-6">
        <form>
          <h3>Add Post</h3>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              name="title"
              ref={titleRef}
            />
          </div>

          <div className="form-group">
            <label>Body</label>
            <textarea
              className="form-control"
              placeholder="Enter Description"
              ref={bodyRef}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block mt-2"
            onClick={submitPostForm}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default AddPost;
