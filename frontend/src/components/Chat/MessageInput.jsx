// import { useState } from 'react'
// import styles from './chatStyles/MessageInput.module.css'

// const MessageInput = ({ onSend }) => {
//   const [text, setText] = useState('')

//   const handleSend = () => {
//     if (!text.trim()) return
//     onSend(text)
//     setText('')
//   }

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') handleSend()
//   }

//   return (
//     <div className={styles.container}>
//       <input
//         type="text"
//         placeholder="Написать сообщение..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyDown={handleKeyPress}
//         className={styles.input}
//       />
//       <button onClick={handleSend} className={styles.button}>
//         Отправить
//       </button>
//     </div>
//   )
// }

// export default MessageInput