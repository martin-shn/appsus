import { EmailPreview } from "./email-preview.jsx";
export function EmailList({ onSelctEmail,emails}) {
    return (
        <div className='email-list'>
            {emails.map(email => <EmailPreview key={email.id} onSelctEmail={onSelctEmail} email={email} />)}
        </div>
    );
}