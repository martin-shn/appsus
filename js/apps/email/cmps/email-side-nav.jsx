const { NavLink } = ReactRouterDOM;

export function EmailSideNav({onFilterStarred,onClearStarred}) {

    return (
        <section className='email-side-nav'>
            <NavLink exact strict to='/email/' onClick={()=>onClearStarred()}>All</NavLink>
            <NavLink to='/email/inbox' onClick={()=>onClearStarred()}>Inbox</NavLink>
            <NavLink exact strict to='/email' onClick={()=>onFilterStarred()}>Starred</NavLink>
            <NavLink to='/email/sent' onClick={()=>onClearStarred()}>Sent</NavLink>
            <NavLink to='/email/drafts' onClick={()=>onClearStarred()}>Drafts</NavLink>
        </section>
    );
}
