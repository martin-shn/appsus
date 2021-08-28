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
        folder: 'inbox',
    };

    componentDidMount() {
        this.loadEmails();
        if (!this.props.match.params.folder) this.props.history.push('/email/inbox');
        else this.setState({ folder: this.props.match.params.folder });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            console.log(this.props);
            this.setState({ folder: this.props.match.params.folder });
        }
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

    onClose = () => {
        this.setState({ sendEmail: null });
    };

    onOpenFull = (emailId) => {
        if (this.state.folder==='drafts') this.props.history.push(`/email/edit/${emailId}?action=edit&father=${this.state.folder}`);
        else this.props.history.push(`/email/read/${emailId}`);
    };

    onReply = (emailId) => {
        this.props.history.push(`/email/edit/${emailId}?action=reply&father=${this.state.folder}`);
    };
    onForward = (emailId) => {
        this.props.history.push(`/email/edit/${emailId}?action=forward&father=${this.state.folder}`);
    };

    onSend=(email)=>{
        email.folder='sent'
        email.sentAt=Date.now()

        emailsService.updateEmail(email).then(()=>this.reload())
    }

    render() {
        console.log('render',this.state.emails);
        return (
            <React.Fragment>
                {!this.state.currEmail && (
                    <React.Fragment>
                        <div className="sides-header-background">
                        <EmailHeader onSetFilter={this.onSetFilter} />
                        </div>
                        <main className='main-container'>
                            <EmailSideNav onFilterStarred={this.onFilterStarred} onClearStarred={this.loadEmails} />
                            <EmailList
                                onSelectEmail={this.onSelectEmail}
                                emails={this.state.emails}
                                reload={this.reload}
                                folder={this.state.folder}
                                onOpenFull={this.onOpenFull}
                                onReply={this.onReply}
                                onForward={this.onForward}
                                onSend={this.onSend}
                            />
                        </main>
                    </React.Fragment>
                )}
                <button className='add-email-btn' onClick={this.onAddEmail}>
                    +
                </button>
                {this.state.sendEmail && <AddEmail onClose={this.onClose} reload={this.reload} />}
                {this.state.currEmail && <EmailDetails email={this.state.currEmail} dueFunc={this.onUnSelectEmail} />}
            </React.Fragment>
        );
    }
}
