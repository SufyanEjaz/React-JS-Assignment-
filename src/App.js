import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Login from "./components/authentications/Login";
import SignUp from "./components/authentications/Registration";
import Dashboard from "./components/Dashboard";
import MyPosts from "./components/MyPosts";
import Header from "./components/Header";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";

function App() {
  return (
    <div className="App">
      <div className="container">
        <CookiesProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addPost" element={<AddPost />} />
            <Route path="/editPost/:postId" element={<EditPost />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/user/:userId" element={<MyPosts />} />
          </Routes>
        </CookiesProvider>
      </div>
    </div>
  );
}

export default App;
