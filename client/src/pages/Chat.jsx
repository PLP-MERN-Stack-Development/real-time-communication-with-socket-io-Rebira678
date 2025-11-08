// src/pages/Chat.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../socket/socket";

const Chat = () => {
  const { messages, users, typingUsers, sendMessage, setTyping, disconnect } =
    useSocket();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    disconnect();
    navigate("/");
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between mb-2">
        <h3>Global Chat</h3>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div
            className="border rounded p-3 mb-2"
            style={{ height: "400px", overflowY: "scroll" }}
          >
            {messages.map((msg) => {
              const isOwn = msg.sender === username;
              return (
                <div
                  key={msg.id}
                  className={`mb-2 p-2 rounded ${
                    isOwn ? "text-dark" : "text-dark"
                  }`}
                  style={{
                    maxWidth: "80%",
                    marginLeft: isOwn ? "auto" : "0",
                    marginRight: isOwn ? "0" : "auto",
                  }}
                >
                  {!isOwn && <b>{msg.sender}: </b>}
                  <div>{msg.message}</div>
                  <small
                    className="d-block text-muted"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setTyping(e.target.value.length > 0);
              }}
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
          {typingUsers.length > 0 && (
            <small className="text-muted">
              {typingUsers.filter((u) => u !== username).join(", ")} typing...
            </small>
          )}
        </div>

        <div className="col-md-4">
          <h5>Online Users ({users.length})</h5>
          <ul className="list-group">
            {users.map((u) => (
              <li key={u.id} className="list-group-item">
                {u.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chat;
