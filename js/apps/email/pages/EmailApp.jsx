import { emailsService } from '../service/email.service.js';
import { EmailHeader } from '../cmps/email-header.jsx';
import { EmailList } from '..cmps/email-list.jsx';
export class EmailApp extends React.Component {
    state = {
        emails: [],
        topFilter: null,
        sideFilter: null,
        currEmail: null,
    };

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => emailsService.query(this.state.topFilter || this.state.sideFilter).then((res) => this.setState({ emails: res }));

    render(){
        return(
            <React.Fragment>
                {!this.state.currEmail && (
                    <React.Fragment>
                        <EmailHeader />
                        <EmailList onSelectEmail={this.onSelectEmail} emails={this.state.emails} />
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}