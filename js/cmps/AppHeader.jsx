const { NavLink, Link, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
    state = {
        isOpen: false,
    };

    menuClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        return (
            <React.Fragment>
                <Link to='/'>
                    <img className='logo' src='./css/img/appLogo.png' />
                </Link>
                <nav className={`${this.state.isOpen ? 'open' : 'closed'}`} onMouseLeave={()=>this.setState({isOpen:false})}>
                    <NavLink activeClassName='my-active' exact to='/' onClick={() => this.setState({ isOpen: false })}>
                        Home
                    </NavLink>
                    <NavLink to='/email' onClick={() => this.setState({ isOpen: false })}>
                        Miss Emails
                    </NavLink>
                    <NavLink to='/note' onClick={() => this.setState({ isOpen: false })}>
                        Miss Keep
                    </NavLink>
                    <NavLink to='/book' onClick={() => this.setState({ isOpen: false })}>
                        Miss Books
                    </NavLink>
                    <NavLink to='/about' onClick={() => this.setState({ isOpen: false })}>
                        About
                    </NavLink>
                </nav>
                <div className={`hamburger ${this.state.isOpen ? '' : 'closed'}`} onClick={this.menuClick}></div>
            </React.Fragment>
        );
    }
}
export const AppHeader = withRouter(_AppHeader);
