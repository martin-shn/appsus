import { emailsService } from '../service/email.service.js';

export function EmailPreview({ email, idx, onSelectEmail, reload, folder }) {
    if (folder && folder !== email.folder) return <React.Fragment></React.Fragment>;
    return (
        <tr className='email-row'>
            <td>
                <input type='checkbox'></input>
            </td>
            <td role='button'>★</td>
            <td className={`isRead ${email.isRead?'read':''}`} onClick={()=>onReadClick(email.id,reload)}></td>
            <td
                className={`from logo-txt ${!email.isRead && 'un-read'}`}
                onClick={() => {
                    emailsService.onToggleRead(email.id);
                    onSelectEmail(email);
                }}
            >{`${email.from}`}</td>
            <td
                className={`subject logo-txt ${!email.isRead && 'un-read'}`}
                onClick={() => {
                    emailsService.onToggleRead(email.id);
                    onSelectEmail(email);
                }}
            >{`${email.subject}`}</td>
            <td>
                <button className='remove-email-btn' onClick={() => onRemoveMail(reload, idx)}>
                    🗑
                </button>
            </td>
                <td>
                    <button className="remove-email-btn" onClick={()=>onRemoveMail(reload,idx)}>🗑</button>
                </td>
                <td>
                    <button className="mark-unread-email-btn" onClick={()=>onMarkAsUnread(reload,idx,email)}>✉</button>
                </td>
        </tr>
    );
}

function onRemoveMail(reload,idx) {
    emailsService.removeEmail(idx)
    .then(()=>reload())
}

function onMarkAsUnread(reload, idx,email) {
    emailsService.toggleMarkAsUnread(idx)
    .then(()=>reload())
    console.log('email: ',email);
}
