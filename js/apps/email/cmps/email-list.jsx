import { EmailPreview } from "./email-preview";
export function EmailList({onSelectEmail,emails}) {
    return (
        <div className='email-list'>
            {emails.map(email => <EmailPreview key={email.id} onSelectEmail={onSelectEmail} email={email} />)}
        </div>
    );
}