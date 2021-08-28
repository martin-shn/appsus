import { emailsService } from '../service/email.service.js';
import { ToolBar } from './toolbar.jsx';

export class EditMail extends React.Component {
    state = {
        email: null,
        action: null,
        father: 'list',
        to: '',
        from: '',
        subject: '',
        body: '',
    };

    componentDidMount() {
        const { emailId } = this.props.match.params;
        const action = new URLSearchParams(this.props.location.search).get('action');
        const father = new URLSearchParams(this.props.location.search).get('father') || 'list';
        emailsService
            .getEmailById(emailId)
            .then((email) =>
                this.setState({ email, action, father }, () => {
                    console.log('props:', this.props, 'action:', action, 'emailId:', emailId, 'father:', father);

                    if (action === 'reply') {
                        this.setState({
                            to: this.state.email.from,
                            from: emailsService.getLoggedUser().email,
                            subject: 'Reply: ' + this.state.email.subject,
                            body:
                                `--------------\nReplied to ${this.state.email.from} at ${new Date().toLocaleString('en-GB')}\n\n` +
                                this.state.email.body +
                                '\n--------------',
                        });
                    }
                    if (action === 'forward') {
                        this.setState({
                            from: emailsService.getLoggedUser().email,
                            subject: 'Forward: ' + this.state.email.subject,
                            body:
                                `--------------\nForwarded from ${this.state.email.from} at ${new Date().toLocaleString('en-GB')}\n\n` +
                                this.state.email.body +
                                '\n--------------',
                        });
                    }
                })
            )
            .catch((err) => console.log('Error:', err));
    }

    handleChange = ({ target }) => {
        this.setState({ [target.id]: target.value });
    };

    onBack = () => {
        console.log(this.state.father);

        if (this.state.father === 'list') this.props.history.push('/email/inbox');
        else if (this.state.father === 'details') this.props.history.push(`/email/read/${this.state.email.id}`);
        else this.props.history.push(`/email/${this.state.father}`);
    };

    onSend = () => {
        let email = {};
        // let email = JSON.parse(JSON.stringify(this.state.email));
        email.to = this.state.to;
        email.from = this.state.from;
        email.subject = this.state.subject;
        email.body = this.state.body;
        emailsService.addEmail(email).then(()=>this.onBack());
    };

    render() {
        console.log('render:', this.state);
        return (
            <React.Fragment>
                <ToolBar onCancel={this.onBack} onBack={this.onBack} onSend={this.onSend} />
                <label htmlFor='from'>From:</label>
                <input id='from' type='text' value={this.state.from} onChange={this.handleChange} />
                <label htmlFor='to'>To:</label>
                <input id='to' type='text' value={this.state.to} onChange={this.handleChange} />
                <label htmlFor='subject:'>Subject:</label>
                <input id='subject' type='text' value={this.state.subject} onChange={this.handleChange} />

                <textarea id='body' value={this.state.body} onChange={this.handleChange} />
            </React.Fragment>
        );
    }
}
