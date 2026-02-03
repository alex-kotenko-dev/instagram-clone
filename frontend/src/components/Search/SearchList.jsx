import { useNavigate } from "react-router-dom"

const SearchList = ({ users }) => {
  const navigate = useNavigate()

  if (!users.length) {
    return <p>No users found</p>
  }

  return (
    <div>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => navigate(`/profile/${user._id}`)}
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
