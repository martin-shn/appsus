import {EmailFilter} from './email-filter.jsx'
const { Link } = ReactRouterDOM;
export class EmailHeader extends React.Component {
    state = {

    }


    render(){
        return(
            <div className="email-header">
               <Link className="clear-link" to='/'><img className="logo" src="../../../../css/img/mister-email/email-logo.png"/>SusMail</Link>
               <EmailFilter onSetFilter={this.props.onSetFilter}/> 
            </div>
        )
    }
}