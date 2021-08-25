const { NavLink, Link, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

    state = {

    }

    render() {
        return (
            <React.Fragment>
                <Link to='/'><img className="logo" src="../css/img/logo.jpg"/></Link>
                <nav>
                    <NavLink activeClassName="my-active" exact to="/" >Home</NavLink>
                    <NavLink to="/note" >Miss Keep</NavLink>
                    <NavLink to="/book" >Miss Books</NavLink>
                    <NavLink to="/email" >Miss Emails</NavLink>
                    <NavLink to="/about" >About</NavLink>
                </nav>
            </React.Fragment>
        )
    }

}
export const AppHeader = withRouter(_AppHeader)
