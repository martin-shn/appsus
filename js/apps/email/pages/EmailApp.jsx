import { emailsService } from '../service/email.service.js';
import { EmailHeader } from '../cmps/email-header.jsx';
import { EmailList } from '../cmps/email-list.jsx';
import { AddEmail } from '../cmps/add-email.jsx';
import {EmailDetails} from '../cmps/email-details.jsx'
import { EmailSideNav } from '../cmps/email-side-nav.jsx';
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

    reload=()=>{
        this.loadEmails()
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.currEmail && (
                    <React.Fragment>
                        <EmailHeader onSetFilter={this.onSetFilter}/>
                        <EmailSideNav />
                        <EmailList onSelectEmail={this.onSelectEmail} emails={this.state.emails} reload={this.reload} />
                    </React.Fragment>
                )}
                <button className="add-email-btn" onClick={this.onAddEmail} >+</button>
                {this.state.sendEmail && <Route path='/email' component={AddEmail} />}
                {this.state.currEmail && <EmailDetails email={this.state.currEmail} dueFunc={this.onUnSelectEmail} />}
            </React.Fragment>
        )
    }
}