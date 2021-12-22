import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosts } from "../redux/actions/postActions";

const MyPosts = () => {
  const posts = useSelector((state) => state.allPosts.posts);
  const navigate = useNavigate();
  const dispath = useDispatch(null);

  useEffect(() => {
    const getAuth = localStorage.getItem("Auth");

    if (!getAuth) {
      navigate("/sign-in");
    }

    dispath(setPosts(posts));
  }, [posts]);

  const editPost = (postID) => {
    navigate(`/editPost/${postID}`);
  };

  const deletePost = (postID) => {
    const deletedPosts = posts.filter((post) => post.id != postID);
    dispath(setPosts(deletedPosts));
  };

  const renderMyPostsList = posts.map((myPost) => {
    return (
      <div className="col-lg-4 cards-custom mt-2" key={myPost.id}>
        <div className="card">
          <div className="card-body">
            <p className="text-center">
              UserId: {myPost.userId}
              <span className="btn-wraper">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm m-1 post-btn"
                  onClick={() => deletePost(myPost.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm m-1 post-btn"
                  onClick={() => editPost(myPost.id)}
                >
                  Edit
                </button>
              </span>
            </p>
            <h4 className="card-title">{myPost.title}</h4>
            <p className="card-text">{myPost.body}</p>
          </div>
        </div>
      </div>
    );
  });
  return <div className="row">{renderMyPostsList}</div>;
};

export default MyPosts;
