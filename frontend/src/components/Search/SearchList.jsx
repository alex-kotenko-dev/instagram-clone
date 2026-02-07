const SearchList = ({ users, onSelect }) => {
  if (!users.length) return null

  return (
    <div style={{ paddingTop: "20px" }}>
      {users.map(user => (
        <div
          key={user._id}
          onClick={() => onSelect(user)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            marginBottom: "10px"
          }}
        >
          <img
            src={user.avatar || "/avatar.png"}
            alt="avatar"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />

          <div>
            <b>{user.username}</b>
            <p>{user.fullname}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchList