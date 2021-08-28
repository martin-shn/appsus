export function ToolBar({ isIconsOnly = false, onSave, onBack, onSend, onOpen, onReply, onForward, onDelete, onMark, onCancel, onUndelete }) {
    return (
        <div className='toolbar'>
            <div>{onBack && <button id='back-btn' onClick={() => onBack()} title='Back'>{`${isIconsOnly ? '' : 'Back'}`}</button>}</div>
            <div>{onCancel && <button id='cancel-btn' onClick={() => onCancel()} title='Cancel'>{`${isIconsOnly ? '' : 'Cancel'}`}</button>}</div>
            <div>{onSave && <button id='save-btn' onClick={() => onSave()} title='Save to drafts'>{`${isIconsOnly ? '' : 'Save'}`}</button>}</div>
            <div>{onSend && <button id='send-btn' onClick={() => onSend()} title='Send'>{`${isIconsOnly ? '' : 'Send'}`}</button>}</div>
            <div>
                {onOpen && (
                    <button id='open-btn' onClick={() => onOpen()} title='Open in new window'>{`${isIconsOnly ? '' : 'Open in new window'}`}</button>
                )}
            </div>
            <div>{onReply && <button id='reply-btn' onClick={() => onReply()} title='Reply'>{`${isIconsOnly ? '' : 'Reply'}`}</button>}</div>
            <div>
                {onForward && <button id='forward-btn' onClick={() => onForward()} title='Forward'>{`${isIconsOnly ? '' : 'Forward'}`}</button>}
            </div>
            <div>{onDelete && <button id='delete-btn' onClick={() => onDelete()} title='Delete'>{`${isIconsOnly ? '' : 'Delete'}`}</button>}</div>
            <div>
                {onMark && <button id='mark-btn' onClick={() => onMark()} title='Mark as unread'>{`${isIconsOnly ? '' : 'Mark as unread'}`}</button>}
            </div>
            <div>
                {onUndelete && (
                    <button id='undelete-btn' onClick={() => onUndelete()} title='Move back to inbox'>{`${
                        isIconsOnly ? '' : 'Move to inbox'
                    }`}</button>
                )}
            </div>
        </div>
    );
}
