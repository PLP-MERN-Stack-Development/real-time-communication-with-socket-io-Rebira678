// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../socket/socket";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { connect } = useSocket();

  const handleLogin = () => {
    if (!username.trim()) return alert("Enter a username");
    localStorage.setItem("username", username);
    connect(username);
    navigate("/chat");
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card p-4 rounded shadow-lg">
        <h2 className="text-center mb-3">Login to Chat</h2>
        <input
          type="text"
          placeholder="Enter username"
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default Login;
