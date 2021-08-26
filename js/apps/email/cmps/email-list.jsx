import { EmailPreview } from "./email-preview.jsx";
export function EmailList({ onSelectEmail, emails }) {
    return (
        <div className='email-list'>
            <table>
                <thead><tr><td>from:</td><td>title:</td></tr></thead>
                <tbody>
                    {emails.map((email,idx) => <EmailPreview key={email.id} idx={idx} onSelectEmail={onSelectEmail} email={email} />)}
                </tbody>
            </table>
        </div>
    );
}