import { EmailPreview } from "./email-preview.jsx";
export function EmailList({ onSelectEmail, emails,reload ,folder}) {
    folder = folder.folder;
    return (
        <div className='email-list'>
            <table>
                <thead>
                    <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>from:</th>
                    <th>title:</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email,idx) => <EmailPreview key={email.id} idx={idx} onSelectEmail={onSelectEmail} email={email} reload={reload} folder={folder}/>)}
                </tbody>
            </table>
        </div>
    );
}
