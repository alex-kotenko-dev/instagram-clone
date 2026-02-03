import { useState } from "react"
import { searchUsers } from "../../api/searchApi"
import SearchList from "./SearchList"

const SearchBox = () => {
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!query.trim()) {
      setUsers([])
      return
    }

    try {
      setLoading(true)
      setError("")
      const res = await searchUsers(query)
      setUsers(res.data)
    } catch (err) {
      setError("Search failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <SearchList users={users} />
    </div>
  )
}

export default SearchBox
