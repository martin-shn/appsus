import { emailsService } from '../service/email.service.js';
import { EmailHeader } from '../cmps/email-header.jsx';
import { EmailList } from '../cmps/email-list.jsx';
import { AddEmail } from '../cmps/add-email.jsx';
import { EmailDetails } from '../cmps/email-details.jsx';
import { EmailSideNav } from '../cmps/email-side-nav.jsx';
const { Route } = ReactRouterDOM;
export class EmailApp extends React.Component {
    state = {
        emails: [],
        filter: null,
        currEmail: null,
        sendEmail: null,
    };

    componentDidMount() {
        this.loadEmails();
        if (!this.props.match.params.folder) this.props.history.push('/email/inbox');
    }

    loadEmails = () => emailsService.query().then((res) => this.setState({ emails: res }));

    onSetFilter = (filterBy) => {
        this.setState({ filter: filterBy }, this.loadEmails);
    };

    onSelectEmail = (email) => {
        this.setState({ currEmail: email });
    };

    onUnSelectEmail = () => {
        this.setState({ currEmail: null });
    };

    onAddEmail = () => {
        this.setState({ sendEmail: <Route path='/email' component={AddEmail} /> });
    };

    onSetFilter = (filteredEmails) => {
        this.setState({ emails: filteredEmails });
    };

    onFilterStarred = () => {
        emailsService.getStarredEmails().then((starredEmails) => this.setState({ emails: starredEmails }));
    };

    reload = () => {
        this.loadEmails();
    };

    onClose=()=>{
        this.setState({sendEmail:null})
    }
    
    render() {
        return (
            <React.Fragment>
                {!this.state.currEmail && (
                    <React.Fragment>
                        <EmailHeader onSetFilter={this.onSetFilter} />
                        <main className='main-container'>
                            <EmailSideNav onFilterStarred={this.onFilterStarred} onClearStarred={this.loadEmails} />
                            <EmailList
                                onSelectEmail={this.onSelectEmail}
                                emails={this.state.emails}
                                reload={this.reload}
                                folder={this.props.match.params}
                            />
                        </main>
                    </React.Fragment>
                )}
                <button className='add-email-btn' onClick={this.onAddEmail}>
                    +
                </button>
                {this.state.sendEmail && <AddEmail  onClose={this.onClose}/>}
                {this.state.currEmail && <EmailDetails email={this.state.currEmail} dueFunc={this.onUnSelectEmail} />}
            </React.Fragment>
        );
    }
}
