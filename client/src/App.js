import React, { useState, useEffect } from "react";
import { useSocket } from "./socket/socket";

function App() {
  const {
    isConnected,
    messages,
    users,
    connect,
    disconnect,
    sendMessage,
    setTyping,
    typingUsers,
  } = useSocket();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [joined, setJoined] = useState(false);

  // Handle user join
  const handleJoin = () => {
    if (username.trim() !== "") {
      connect(username);
      setJoined(true);
    }
  };

  // Handle sending message
  const handleSend = () => {
    if (message.trim() !== "") {
      sendMessage({ message });
      setMessage("");
      setTyping(false);
    }
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Real-Time Chat App</h1>
      <p>Status: {isConnected ? "Connected ✅" : "Disconnected ❌"}</p>

      {!joined ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Join Chat</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Users List */}
          <div style={{ flex: "1" }}>
            <h3>Users Online</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>

          {/* Chat Box */}
          <div style={{ flex: "2" }}>
            <h3>Chat</h3>
            <div
              style={{
                border: "1px solid gray",
                height: "300px",
                overflowY: "scroll",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.system ? <i>{msg.message}</i> : <b>{msg.sender}: </b>}
                  {!msg.system && <span>{msg.message}</span>}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setTyping(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              style={{ width: "80%" }}
            />
            <button onClick={handleSend}>Send</button>
            {typingUsers.length > 0 && (
              <p>
                {typingUsers.join(", ")}{" "}
                {typingUsers.length === 1 ? "is" : "are"} typing...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
