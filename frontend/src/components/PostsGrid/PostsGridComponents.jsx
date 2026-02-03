import { useNavigate } from "react-router-dom"

const PostsGrid = ({ posts }) => {
  const navigate = useNavigate()

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px",
      marginTop: "20px"
    }}>
      {posts.map(post => (
        <div
          key={post._id}
          style={{ height: "250px", cursor: "pointer" }}
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          <img
            src={post.image}
            alt="post"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  )
}

export default PostsGrid
