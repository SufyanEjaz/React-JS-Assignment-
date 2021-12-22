import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setPosts } from "../../redux/actions/postActions";
import { genericFunction } from "../GenericFunction";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, SetAuth] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["Auth"]);

  const submitLoginForm = async (event) => {
    event.preventDefault();
    if (emailRef.current.value.length === 0) {
      emailRef.current.focus();
    } else {
      const inputUserEmail = emailRef.current.value;
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      const usersArray = await response.data;
      const isUserExist = usersArray.find(
        (user) => user.email === inputUserEmail
      );

      if (isUserExist) {
        localStorage.setItem("Auth", true);
        localStorage.setItem("userID", isUserExist.id);
        setCookie("Auth", true, {
          path: "/",
          expires: new Date(Date.now() + 540000),
        });

        SetAuth(true);
        const fetchUserPosts = async () => {
          const response = await axios
            .get(
              `https://jsonplaceholder.typicode.com/posts?userId=${isUserExist.id}`
            )
            .catch((err) => {
              console.log("err", err);
            });
          dispatch(setPosts(response.data));
        };

        fetchUserPosts();
        navigate(`/user/${isUserExist.id}`);
      } else {
        localStorage.removeItem("Auth");
        localStorage.removeItem("userID");
        removeCookie("Auth");
        navigate("/sign-in");
      }
    }
  };

  useEffect(() => {
    genericFunction();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-3"></div>
      <div className="col-lg-6">
        <form>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              ref={emailRef}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block mt-2"
            onClick={submitLoginForm}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default Login;
