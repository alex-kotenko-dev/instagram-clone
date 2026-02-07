import styles from "./PostActionsModal.module.css"

const PostActionsModal = ({ onClose, onEdit, onDelete, onCopy }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onCopy}>Copy link</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default PostActionsModal