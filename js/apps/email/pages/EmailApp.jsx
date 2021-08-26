import { emailsService } from '../service/email.service.js';
import { EmailHeader } from '../cmps/email-header.jsx';
import { EmailList } from '../cmps/email-list.jsx';
import { AddEmail } from '../cmps/add-email.jsx';
import {EmailDetails} from '../cmps/email-details.jsx'
const { Route } = ReactRouterDOM;
export class EmailApp extends React.Component {
    state = {
        emails: [],
        filter: null,
        currEmail: null,
        sendEmail: null
    };

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => emailsService.query().then((res) => this.setState({ emails: res }));

    onSetFilter = (filterBy) => {
        this.setState({ filter: filterBy }, this.loadEmails);
    }

    onSelectEmail = (email) => {
        this.setState({ currEmail: email });
    };

    onUnSelectEmail = () => {
        this.setState({ currEmail: null });
    };
    
    onAddEmail = () => {
        this.setState({sendEmail: <Route path='/email' component={AddEmail} />})
    }

    onSetFilter=(filteredEmails)=>{
        this.setState({emails:filteredEmails})
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.currEmail && (
                    <React.Fragment>
                        <EmailHeader onSetFilter={this.onSetFilter}/>
                        <EmailList onSelectEmail={this.onSelectEmail} emails={this.state.emails} />
                    </React.Fragment>
                )}
                <button className="add-email-btn" onClick={this.onAddEmail} >+</button>
                {this.state.sendEmail && <Route path='/email' component={AddEmail} />}
                {console.log('hello',this.state.currEmail)}
                {this.state.currEmail && <EmailDetails email={this.state.currEmail} dueFunc={this.onUnSelectEmail} />}
            </React.Fragment>
        )
    }
}