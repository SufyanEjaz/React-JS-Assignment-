import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../redux/actions/postActions";
import { Navigate } from "react-router-dom";

const EditPost = () => {
  const postID = useParams();
  const posts = useSelector((state) => state.allPosts.posts);
  const dispatch = useDispatch(null);
  const navigate = useNavigate();
  const [editPost, setEditPost] = useState({
    userId: "",
    id: "",
    title: "",
    body: "",
  });

  const editPostHandler = (event) => {
    event.preventDefault();
    // posts
    const updatePost = posts.findIndex((post) => post.id === editPost.id);
    console.log(updatePost);
    posts[updatePost] = editPost;
    dispatch(setPosts(posts));
    navigate(`/user/${editPost.userId}`);
  };

  useEffect(() => {
    const EditPostData = posts.find((post) => {
      if (post.id == postID.postId) {
        setEditPost(post);
      }
    });
    console.log(editPost);
  }, []);

  return (
    <div className="row">
      <div className="col-lg-3"></div>
      <div className="col-lg-6">
        <form>
          <h3>Edit Post</h3>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              name="title"
              value={editPost.title}
              onChange={(event) =>
                setEditPost({
                  ...editPost,
                  title: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Body</label>
            <textarea
              className="form-control"
              placeholder="Enter Description"
              rows="5"
              value={editPost.body}
              onChange={(event) =>
                setEditPost({
                  ...editPost,
                  body: event.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block mt-2"
            onClick={editPostHandler}
          >
            Update
          </button>
        </form>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default EditPost;
