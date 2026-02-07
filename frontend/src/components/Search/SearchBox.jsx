import { useEffect, useState } from "react"
import { searchUsers } from "../../api/searchApi"
import SearchList from "./SearchList"
import styles from "./Search.module.css"
import { FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const SearchBox = ({ closePanel }) => {
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (!query.trim()) {
      setUsers([])
      return
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        setError("")
        const res = await searchUsers(query)
        setUsers(res.data)
      } catch {
        setError("Search failed")
      } finally {
        setLoading(false)
      }
    }, 350)

    return () => clearTimeout(timer)
  }, [query])

  const handleClear = () => {
    setQuery("")
    setUsers([])
    setError("")
  }

  const handleSelectUser = (user) => {
    handleClear()
    closePanel?.()
    navigate(`/profile/${user._id}`)
  }

  return (
    <div>
      <div className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <FaTimes
              className={styles.clearIcon}
              onClick={handleClear}
            />
          )}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <SearchList users={users} onSelect={handleSelectUser} />

      {!loading && query && users.length === 0 && (
        <p className={styles.noUsers}>No users found</p>
      )}
    </div>
  )
}

export default SearchBox