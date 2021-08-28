import { EmailPreview } from './email-preview.jsx';
export function EmailList({ onSelectEmail, emails, reload, folder, onOpenFull, onReply, onForward }) {
    return (
        <div className='email-list'>
            <table>
                <thead>
                    <tr className='header-row'>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>From</th>
                        <th>Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email, idx) => (
                        <EmailPreview
                            key={email.id}
                            idx={idx}
                            onSelectEmail={onSelectEmail}
                            email={email}
                            reload={reload}
                            folder={folder}
                            onOpenFull={onOpenFull}
                            onReply={onReply}
                            onForward={onForward}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
