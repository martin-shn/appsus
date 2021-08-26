import { emailsService } from "../service/email.service.js";
const { Link } = ReactRouterDOM;

export function EmailPreview({ email ,idx }) {

    return (
        <tr>
            <Link className="clear-link logo-txt" to={`/email/${email.id}`}>
                <td>
                    <input type="checkbox"></input>
                </td>
                <td role="button">
                    ★
                </td>
                <td className="from">
                    {`${email.from}`}
                </td>
                <td>
                    {`${email.subject}`}
                </td>
                <td>
                    <button onClick={ () => emailsService.removeEmail(email.id,idx).then(()=>this.props.history.push('/email'))}>X</button>
                </td>
            </Link>
        </tr>
    );
}