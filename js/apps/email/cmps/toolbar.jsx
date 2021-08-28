export function ToolBar({ isIconsOnly=false, onSave, onBack, onSend, onOpen, onReply, onForward, onDelete, onMark, onCancel,onUndelete }) {
    return (
        <React.Fragment>
            {onBack && <button id="back-btn" onClick={() => onBack()} title="Back">{`${isIconsOnly ? '' : 'Back'}`}</button>}
            {onCancel && <button id="cancel-btn" onClick={() => onCancel()} title="Cancel">{`${isIconsOnly ? '' : 'Cancel'}`}</button>}
            {onSave && <button id="save-btn" onClick={() => onSave()} title="Save to drafts">{`${isIconsOnly ? '' : 'Save'}`}</button>}
            {onSend && <button id="send-btn" onClick={() => onSend()} title="Send">{`${isIconsOnly ? '' : 'Send'}`}</button>}
            {onOpen && <button id="open-btn" onClick={() => onOpen()} title="Open in new window">{`${isIconsOnly ? '' : 'Open in new window'}`}</button>}
            {onReply && <button id="reply-btn" onClick={() => onReply()} title="Reply">{`${isIconsOnly ? '' : 'Reply'}`}</button>}
            {onForward && <button id="forward-btn" onClick={() => onForward()} title="Forward">{`${isIconsOnly ? '' : 'Forward'}`}</button>}
            {onDelete && <button id="delete-btn" onClick={() => onDelete()} title="Delete">{`${isIconsOnly ? '' : 'Delete'}`}</button>}
            {onMark && <button id="mark-btn" onClick={() => onMark()} title="Mark as unread">{`${isIconsOnly ? '' : 'Mark as unread'}`}</button>}
            {onUndelete && <button id="undelete-btn" onClick={() => onUndelete()} title="Move back to inbox">{`${isIconsOnly ? '' : 'Move to inbox'}`}</button>}
        </React.Fragment>
    );
}
