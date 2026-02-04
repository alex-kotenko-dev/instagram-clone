import PostFeed from "../../components/PostFeed/PostFeedComponent"

const HomePage = () => {
  return (
    <div>
      <PostFeed filter="following"/>
    </div>
  )
}

export default HomePage