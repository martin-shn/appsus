import { EmailFilter } from "./email-filter.jsx";
import { emailsService } from "../service/email.service.js"; 
const {Link} = ReactRouterDOM;

export class EmailHeader extends React.Component {
    state = {
        filter: null
    }

    onSetFilter = (filterBy) => {
        this.setState({ filter: filterBy }, emailsService.loadEmailsList());
    }

    render(){
        return(
            // <h1>Emails</h1>
            <div className="email-header">
               <Link className="clear-link" to='/'><img className="logo" src="../../../../css/img/mister-email/email-logo.png"/>SusMail</Link> 
               <EmailFilter onSetFilter={this.onSetFilter}/>
            </div>
        )
    }
}