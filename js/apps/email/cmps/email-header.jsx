import {EmailFilter} from './email-filter.jsx'
const { Link } = ReactRouterDOM;
export class EmailHeader extends React.Component {
    state = {

    }


    render(){
        return(
            <div className="email-header">
                <svg><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
               <Link className="clear-link" to='/'><img className="logo" src="../../../../css/img/mister-email/email-logo.png"/>SusMail</Link>
               <EmailFilter onSetFilter={this.props.onSetFilter}/> 
            </div>
        )
    }
}