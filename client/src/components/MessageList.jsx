const MessageList = ({ messages, typingUsers }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`${msg.system ? "text-gray-500 italic" : ""}`}
        >
          {msg.system ? (
            msg.message
          ) : (
            <span>
              <strong>{msg.sender}</strong>: {msg.message}
            </span>
          )}
        </div>
      ))}
      {typingUsers.length > 0 && (
        <div className="text-gray-500 italic">
          {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"}{" "}
          typing...
        </div>
      )}
    </div>
  );
};

export default MessageList;
