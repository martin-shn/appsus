export function ToolBar({ onBack, onSend, onOpen, onReply, onForward, onDelete, onMark }) {
    return (
        <React.Fragment>
            {onBack && <button onClick={() => onBack()}>Back</button>}
            {onSend && <button onClick={() => onSend()}>Send</button>}
            {onOpen && <button onClick={() => onOpen()}>Open in new window</button>}
            {onReply && <button onClick={() => onReply()}>Reply</button>}
            {onForward && <button onClick={() => onForward()}>Forward</button>}
            {onDelete && <button onClick={() => onDelete()}>Delete</button>}
            {onMark && <button onClick={() => onDelete()}>Mark as read</button>}
        </React.Fragment>
    );
}
