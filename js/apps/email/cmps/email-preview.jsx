const { Link } = ReactRouterDOM;

export function EmailPreview({ email }) {

    return (
        <Link className="clear-link logo-txt" to={`/email/${email.id}`}>
            <div className="email-preview">
                <input type="checkbox"></input>
                <span role="button">★</span>
                <span className="from">{`${email.from}`}</span>
                <span>{`${email.subject}`}</span>
            </div>
        </Link>
    );
}