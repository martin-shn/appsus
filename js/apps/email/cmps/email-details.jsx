import { emailsService } from '../service/email.service.js';
import { ToolBar } from './toolbar.jsx';

export class EmailDetails extends React.Component {
    state = {
        email: {
            id: 'e102',
            subject: 'Promotion day!',
            body: 'Get the best deals',
            isRead: false,
            sentAt: 1551133930594,
            from: 'Best Buy',
            to: 'momo@momo.com',
        },
    };

    componentDidMount(prevProps) {
        this.loadEmail();
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
    //         this.loadEmail();
    //     }
    // }

    loadEmail = () => {
        // const id = this.props.match.params.emailId;
        // emailsService.getEmailById(id).then((email) => {
        //     if (!email) this.props.history.push('/email');
        //     this.setState({ email });
        // });
        // this.setState({ email: this.props.email });
        const { emailId } = this.props.match.params;
        emailsService.getEmailById(emailId).then((email) => {
            this.setState({ email });
        });
    };

    onBack = () => {
        this.props.history.push('/email/inbox');
    };

    onReply = () => {
        this.props.history.push(`/email/edit/${this.state.email.id}?action=reply&father=details`);
    };

    onForward = () => {
        this.props.history.push(`/email/edit/${this.state.email.id}?action=forward&father=details`);
    };

    onDelete = () => {
        emailsService.removeEmail(this.state.email.id).then(() => this.props.history.push('/mail/inbox'));
    };

    onMark = () => {
        emailsService.onToggleRead(this.state.email.id);
    };

    render() {
        const { email } = this.state;
        // if (!email) return <React.Frafmant></React.Frafmant>
        email.isRead = true;
        return (
            <React.Fragment>
                <ToolBar onBack={this.onBack} onReply={this.onReply} onForward={this.onForward} onDelete={this.onDelete} onMark={this.onMark} />
                <table className='email-details'>
                    <thead>
                        <tr>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='email-subject'>
                            <td className='details-body'>Subject: {email.subject}</td>
                        </tr>
                        <tr>
                            <td className='details-body'>From: {email.from}</td>
                        </tr>
                        <tr>
                            <td className='details-body'>Message: {email.body}</td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
