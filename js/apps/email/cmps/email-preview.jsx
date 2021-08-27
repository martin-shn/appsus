import { emailsService } from '../service/email.service.js';

export function EmailPreview({ email, idx, onSelectEmail, reload, folder }) {
    if (folder && folder !== email.folder) return <React.Fragment></React.Fragment>;
    return (
        <tr className='email-row'>
            <td>
                <input type='checkbox'></input>
            </td>
            <td className={`isStarred ${email.isStarred?'starred':''}`} onClick={()=>onStarredClick(email.id,reload,email)}></td>
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
                    <button className="remove-email-btn" onClick={()=>onRemoveMail(reload,idx)}></button>
                </td>
               
        </tr>
    );
}

function onRemoveMail(reload,idx) {
    emailsService.removeEmail(idx)
    .then(()=>reload())
}

function onReadClick(emailId, reload) {
    emailsService.onToggleRead(emailId)
    .then(()=>reload())
}

function onStarredClick(emailId, reload,email) {
    emailsService.onToggleStarred(emailId)
    .then(()=>reload())
    console.log('email isStarred?: ',email);
}