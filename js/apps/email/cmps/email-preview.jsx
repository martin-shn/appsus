import { emailsService } from "../service/email.service.js";

export function EmailPreview({ email ,idx,onSelectEmail,reload,folder }) {
    
    return (
        <tr className="email-row">
                <td>
                    <input type="checkbox"></input>
                </td>
                <td role="button">
                    ★
                </td>
            <td 
            className={`logo-txt ${!email.isRead && 'un-read'}`} 
            onClick={() => {
                emailsService.onToggleRead(email.id)
                onSelectEmail(email)
                }}>
                <td className="from">
                    {`${email.from}`}
                </td>
                <td className="subject">
                    {`${email.subject}`}
                </td>
            </td>
                <td>
                    <button className="remove-email-btn" onClick={()=>onRemoveMail(reload,idx)}>🗑</button>
                </td>
        </tr>
    );
}

function onRemoveMail(reload,idx){
    emailsService.removeEmail(idx)
    .then(()=>reload())
}
