import { useState } from "react"
import { createPost } from "../../api/postsApi"
import style from "./CreatePost.module.css"
import { useNavigate } from "react-router-dom"

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text && !image) { 
      setError("Post cannot be empty")
      return
    }

    try {
      setLoading(true)
      setError("")

      const formData = new FormData()
      formData.append("text", text)
      if (image) formData.append("image", image)

      await createPost(formData)

      setText("")
      setImage(null)

      if (onPostCreated) onPostCreated()
      navigate("/profile")
    } catch (e) {
      console.error(e)
      setError("Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be less than 2MB")
      return
    }

    setError("")
    setImage(file) 
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setError("")
        }}
        placeholder="Write a caption..."
        className={style.textarea}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={style.file}
      />

      {error && <p className={style.error}>{error}</p>}

      <button
        type="submit"
        className={style.btn}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  )
}

export default CreatePost
