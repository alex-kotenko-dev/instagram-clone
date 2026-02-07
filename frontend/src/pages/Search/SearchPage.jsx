import SearchBox from "../../components/Search/SearchBox"

const SearchPage = ({closePanel}) => {
  return (
    <div>
      <h2>Search</h2>
      <SearchBox closePanel={closePanel}/>
    </div>
  )
}

export default SearchPage
