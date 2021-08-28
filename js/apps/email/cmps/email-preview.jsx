import { emailsService } from '../service/email.service.js';
import { InListEmailPreview } from './InListEmailPreview.jsx';
import { ToolBar } from './toolbar.jsx';

export class EmailPreview extends React.Component {
    state = {
        email: this.props.email,
        idx: this.props.idx,
        onSelectEmail: this.props.onSelectEmail,
        reload: this.props.reload,
        folder: this.props.folder,
        isPreview: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({ folder: this.props.folder });
        }
    }

    onRemoveMail = (reload, emailId) => {
        emailsService.removeEmail(emailId).then(() => reload());
    };

    onReadClick = (emailId, reload) => {
        emailsService.onToggleRead(emailId).then(() => reload());
    };

    onStarredClick = (emailId, reload, email) => {
        emailsService.onToggleStarred(emailId).then(() => reload());
        console.log('email isStarred?: ', email);
    };

    onOpenFull = (emailId) => {
        this.props.onOpenFull(emailId);
    };

    onReply = (emailId) => {
        this.props.onReply(emailId);
    };

    onForward = (emailId) => {
        this.props.onForward(emailId);
    };

    render() {
        const { email, idx, onSelectEmail, reload, folder } = this.state;

        // console.log(folder,'===?===',email.folder);
        if (folder && folder !== 'starred' && folder !== email.folder) return <React.Fragment></React.Fragment>;

        return (
            <React.Fragment>
                <tr className='email-row'>
                    <td>
                        <input type='checkbox'></input>
                    </td>
                    <td className={`isStarred ${email.isStarred ? 'starred' : ''}`} onClick={() => this.onStarredClick(email.id, reload, email)}></td>
                    <td className={`isRead ${email.isRead ? 'read' : ''}`} onClick={() => this.onReadClick(email.id, reload)}></td>
                    <td
                        className={`from logo-txt ${!email.isRead && 'un-read'}`}
                        onClick={() => {
                            if (!email.isRead) emailsService.onToggleRead(email.id);
                            this.setState({ isPreview: !this.state.isPreview });
                        }}
                        onDoubleClick={() => this.onOpenFull(email.id)}
                    >{`${email.from}`}</td>
                    <td
                        className={`subject logo-txt ${!email.isRead && 'un-read'}`}
                        onClick={() => {
                            if (!email.isRead) emailsService.onToggleRead(email.id);
                            this.setState({ isPreview: !this.state.isPreview });
                        }}
                    >{`${email.subject}`}</td>
                    <td>
                        <button className='remove-email-btn' onClick={() => this.onRemoveMail(reload, email.id)}></button>
                    </td>
                </tr>
                {this.state.isPreview && (
                    <InListEmailPreview
                        email={this.state.email}
                        onOpenFull={this.onOpenFull}
                        onReply={this.onReply}
                        onForward={this.onForward}
                        onDelete={() => this.onRemoveMail(reload, email.id)}
                    />
                )}
            </React.Fragment>
        );
    }
}
