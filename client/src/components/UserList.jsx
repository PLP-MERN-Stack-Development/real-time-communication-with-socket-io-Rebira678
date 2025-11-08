const UserList = ({ users }) => {
  return (
    <div className="w-64 border-r bg-white p-4 overflow-y-auto">
      <h2 className="font-bold mb-2">Online Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
