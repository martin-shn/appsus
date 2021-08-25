import { emailsService } from '../service/email.service.js';
import { EmailHeader } from '../cmps/email-header.jsx';
import { EmailList } from '../cmps/email-list.jsx';
import { AddEmail } from '../cmps/add-email.jsx';

export class EmailApp extends React.Component {
    state = {
        emails: [],
        topFilter: null,
        sideFilter: null,
        currEmail: null,
        sendEmail: null
    };

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => emailsService.query().then((res) => this.setState({ emails: res }));

    onSelectEmail = (email) => {
        this.setState({ currEmail: email });
    };

    onUnSelectEmail = () => {
        this.setState({ currEmail: null });
    };
    
    onAddEmail = () => {
        this.setState({sendEmail: <AddEmail/>})
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.currEmail && (
                    <React.Fragment>
                        <EmailHeader />
                        <EmailList onSelectEmail={this.onSelectEmail} emails={this.state.emails} />
                    </React.Fragment>
                )}
                <button className="add-email-btn" onClick={this.onAddEmail} >+</button>
                {this.state.sendEmail && <AddEmail/>}
                {this.state.currEmail && <EmailDetails email={this.state.currEmail} onUnSelectEmail={this.onUnSelectEmail} />}
            </React.Fragment>
        )
    }
}