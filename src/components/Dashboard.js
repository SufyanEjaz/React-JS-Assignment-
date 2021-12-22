import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const fetchAllPosts = async () => {
    const response = await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .catch((err) => {
        console.log("err", err);
      });
    setPosts(response.data.slice(0, 20));
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const renderPostsList = posts.map((post) => {
    return (
      <div className="col-lg-4 cards-custom mt-2" key={post.id}>
        <div className="card">
          <div className="card-body">
            <p>UserId: {post.userId}</p>
            <h4 className="card-title">{post.title}</h4>
            <p className="card-text">{post.body}</p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="row">{renderPostsList}</div>
    </>
  );
};

export default Dashboard;
