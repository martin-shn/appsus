import { emailsService } from "../service/email.service.js";
import {utilService} from "../../../services/util.service.js"

export class AddEmail extends React.Component {
    state = {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        isStarred:false,
        folder: 'inbox',
        sentAt: null,
        from: 'mahatmagandi@appsus.com',
        to: 'Mahatma Gandi'
    }
    
    timmer
    componentDidMount() {
        this.timmer = setInterval(() => {
            this.onDraftsEmail()
        }, 5000)
    }
    
    componentWillUnmount() {
        clearInterval(this.timmer)
    }
    

    handleChange = (ev) => {
        const field = ev.target.name;
        this.setState({ [field]: ev.target.value },()=>this.onSaveEmail());
    };

    emailToSave
    onSaveEmail = (ev)=>{
        const {subject, body, isRead, isStarred, folder, sentAt, from, to} = this.state
        const id = utilService.makeId();
         this.emailToSave={id, subject, body, isRead, isStarred, folder, sentAt: new Date(), from, to};
    }
    
    onSendEmail = (ev)=> {
        ev.preventDefault()
        this.emailToSave.folder = 'sent'
        emailsService.addEmail(this.emailToSave).then(()=>{
            clearInterval(this.timmer);
            this.props.onClose();
        });
    }

    onDraftsEmail = ()=> {
        this.emailToSave.folder = 'drafts'
        // Todo - make a copy email and update the copy
        emailsService.addEmail(this.emailToSave)//****************** warning!! this email will add to drafts folder multiple times ***************/
    }
    

    render() {
        return (
            <div className="add-email">
                <div>
                    <h2>New Message</h2>
                    <button className="add-email-close-btn" onClick={()=>this.props.onClose()}></button>
                </div>
                <form onSubmit={this.onSendEmail}>
                    <input type="search" name="to" placeholder="To" value={this.state.to} onChange={this.handleChange} />
                    <input type="text" name="subject" placeholder="subject" value={this.state.subject} onChange={this.handleChange} />
                    <textarea className="add-email-txt" rows="5" name="body" value={this.state.message} onChange={this.handleChange}></textarea>
                    <button className="send-btn">Send</button>
                </form>
            </div>
        )
    }
}
