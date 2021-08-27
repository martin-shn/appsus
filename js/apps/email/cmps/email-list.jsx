import { EmailPreview } from "./email-preview.jsx";
export function EmailList({ onSelectEmail, emails,reload ,folder}) {
    return (
        <div className='email-list'>
            <table>
                <thead><td></td><td></td><tr><td>from:</td><td>title:</td><td></td></tr></thead>
                <tbody>
                    {emails.map((email,idx) => {email.folder===folder&&<EmailPreview key={email.id} idx={idx} onSelectEmail={onSelectEmail} email={email} reload={reload} />})}
                </tbody>
            </table>
        </div>
    );
}
