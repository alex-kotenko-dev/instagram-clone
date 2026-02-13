import { useParams } from "react-router-dom"
import ChatWindow from "../../components/Chat/ChatWindow"

const MessagePage = () => {
  const { userId } = useParams()

  return <ChatWindow initialUserId={userId} />
}

export default MessagePage