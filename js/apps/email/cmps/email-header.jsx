const {Link} = ReactRouterDOM;

export class EmailHeader extends React.Component {
    state = {

    }


    render(){
        return(
            // <h1>Emails</h1>
            <div className="email-header">
                <h1>Emails</h1>
               <Link to='/'><img className="logo" src="../../../../css/img/mister-email/email-logo.png"/></Link> 
            </div>
        )
    }
}