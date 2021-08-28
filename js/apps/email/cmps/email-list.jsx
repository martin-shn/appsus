import { EmailPreview } from './email-preview.jsx';
export function EmailList({ onSelectEmail, emails, reload, folder, onOpenFull, onReply, onForward, onSend }) {
    return (
        <div className='email-list'>
            <table>
                <thead>
                    <tr className='header-row'>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>{`${folder==='sent'||folder==='drafts' ? 'To' : 'From'}`}</th>
                        <th>Subject</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email, idx) => (
                        <EmailPreview
                            key={email.id}
                            onSelectEmail={onSelectEmail}
                            email={email}
                            reload={reload}
                            folder={folder}
                            onOpenFull={onOpenFull}
                            onReply={onReply}
                            onForward={onForward}
                            onSend={onSend}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
