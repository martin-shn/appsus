export function EmailSideNav(){

        return(
            <section className="email-side-nav">
                <Link to="/mail/">All</Link>
                <Link to="/mail/inbox">Inbox</Link>
                <Link to="">Starred</Link>
                <Link to="/mail/sent">Sent</Link>
                <Link to="/mail/drafts">Drafts</Link>
            </section>
        )
    
}
