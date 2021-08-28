export function ToolBar({ isIconsOnly=false, onBack, onSend, onOpen, onReply, onForward, onDelete, onMark, onCancel }) {
    return (
        <React.Fragment>
            {onBack && <button id="back-btn" onClick={() => onBack()} title="Back">{`${isIconsOnly ? '' : 'Back'}`}</button>}
            {onCancel && <button id="cancel-btn" onClick={() => onCancel()} title="Cancel">{`${isIconsOnly ? '' : 'Cancel'}`}</button>}
            {onSend && <button id="send-btn" onClick={() => onSend()} title="Send">{`${isIconsOnly ? '' : 'Send'}`}</button>}
            {onOpen && <button id="open-btn" onClick={() => onOpen()} title="Open in new window">{`${isIconsOnly ? '' : 'Open in new window'}`}</button>}
            {onReply && <button id="reply-btn" onClick={() => onReply()} title="Reply">{`${isIconsOnly ? '' : 'Reply'}`}</button>}
            {onForward && <button id="forward-btn" onClick={() => onForward()} title="Forward">{`${isIconsOnly ? '' : 'Forward'}`}</button>}
            {onDelete && <button id="delete-btn" onClick={() => onDelete()} title="Delete">{`${isIconsOnly ? '' : 'Delete'}`}</button>}
            {onMark && <button id="mark-btn" onClick={() => onMark()} title="Mark as unread">{`${isIconsOnly ? '' : 'Mark as unread'}`}</button>}
        </React.Fragment>
    );
}
