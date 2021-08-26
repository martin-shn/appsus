import { emailsService } from "../service/email.service.js";
const { Link } = ReactRouterDOM;

export function EmailPreview({ email ,idx,onSelectEmail }) {

    return (
        <tr className="email-row">
                <td>
                    <input type="checkbox"></input>
                </td>
                <td role="button">
                    ★
                </td>
            <Link 
            className={`clear-link logo-txt ${!email.isRead && 'un-read'}`} 
            onClick={() => {
                emailsService.onToggleRead(email.id)
                onSelectEmail(email)
                }}>
                <td className="from">
                    {`${email.from}`}
                </td>
                <td>
                    {`${email.subject}`}
                </td>
                <td>
                    {/* <button className="remove-email-btn" onClick={ () => emailsService.removeEmail(email.id,idx).then(()=>this.props.history.push('/email'))}>🗑</button> */}
                </td>
            </Link>
        </tr>
    );
}