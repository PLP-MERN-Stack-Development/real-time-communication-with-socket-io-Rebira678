const MessageInput = ({ value, onChange, onSend }) => {
  return (
    <div className="flex p-4 border-t bg-white">
      <input
        type="text"
        className="flex-1 border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSend()}
      />
      <button
        onClick={onSend}
        className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
