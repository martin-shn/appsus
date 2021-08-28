const { NavLink, Link, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

    state = {
        isOpen:false,
    }

    menuClick=()=>{
        this.setState({isOpen:!this.state.isOpen})
    }

    render() {
        return (
            <React.Fragment>
                <Link to='/'><img className="logo" src="../css/img/appLogo.png"/></Link>
                <nav className={`${this.state.isOpen?'open':'closed'}`}>
                    <NavLink activeClassName="my-active" exact to="/" >Home</NavLink>
                    <NavLink to="/email" >Miss Emails</NavLink>
                    <NavLink to="/note" >Miss Keep</NavLink>
                    <NavLink to="/book" >Miss Books</NavLink>
                    <NavLink to="/about" >About</NavLink>
                </nav>
                <div className={`hamburger ${this.state.isOpen?'':'closed'}`} onClick={this.menuClick}></div>
            </React.Fragment>
        )
    }
        
}
export const AppHeader = withRouter(_AppHeader)
