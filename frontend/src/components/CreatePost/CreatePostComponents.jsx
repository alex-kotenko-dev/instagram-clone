import { useState } from "react"
import { createPost } from "../../api/postsApi"
import style from "./CreatePost.module.css"
import { FaCloudUploadAlt } from "react-icons/fa" 


const CreatePost = ({ onPostCreated, closePanel }) => {
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) { 
      setError("Post cannot be empty")
      return
    }

    try {
      setLoading(true)
      setError("")

      const formData = new FormData()
      formData.append("text", text || "")
      if (image) formData.append("image", image)

     const res = await createPost(formData)

      if (onPostCreated) {
        onPostCreated(res.data)
      }

      setText("")
      if (image) URL.revokeObjectURL(image)
      setImage(null)

      if (closePanel) closePanel()

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
  <div className={style.overlay}>
    <form className={style.createForm} onSubmit={handleSubmit}>
     <div className={style.top}>
       <h4 className={style.title}>Create new post</h4>
       <button
        type="submit"
        className={style.btn}
        disabled={loading}>
        {loading ? "Posting..." : "Share"}
       </button>
     </div>

     <div className={style.containerRightLeft}>
      <div className={style.left}>
       <label className={style.uploadPlaceholder}>
        {image ? (
          <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className={style.previewImage}/>
        ) : (
           <>
            <FaCloudUploadAlt size={100} color="#999"/>
           </> 
        )}
            <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={style.fileInput}/>
          </label>
      </div>

      <div className={style.right}>
        <textarea
         value={text}
         onChange={(e) => {
          setText(e.target.value)
          setError("")
         }}
         placeholder="Write a caption..."
         className={style.textarea}
       />

       {error && <p className={style.error}>{error}</p>}

      </div>
     </div> 

    </form>
 </div>
  )
}

export default CreatePost

