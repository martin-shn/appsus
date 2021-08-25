const {Link} = ReactRouterDOM;

export function EmailPreview({email})
return(
    <Link to={`/email/${email.id}`}>
    <div className="email-preview">
        <span className="from">{`${email.from}`}</span>
    {/* <input type="checkbox"></input> */}
    </div>
    </Link>
)