import { emailsService } from "../service/email.service.js";
import {utilService} from "../../../services/util.service.js"

export class AddEmail extends React.Component {
    state = {
        subject: '',
        body: '',
        from: '',
        to: ''
    }
    
    timmer
    componentDidMount() {
        this.setState({from:emailsService.getLoggedUser().email})
        this.timmer = setInterval(() => {
            this.onDraftsEmail()
        }, 5000)
    }
    
    componentWillUnmount() {
        clearInterval(this.timmer)
    }
    
    close=()=>{
        clearInterval(this.timmer)
        this.props.onClose()
    }

    handleChange = ({target}) => {
        this.setState({ [target.name]: target.value });
    };
    
    onSendEmail = (ev)=> {
        ev.preventDefault()
        const email = {
            to:this.state.to,
            from:this.state.from,
            subject: this.state.subject,
            body: this.state.body,
            folder: 'sent',
            sentAt: Date.now(),
        }
        if(this.state.id) email.id=this.state.id;

        emailsService.updateEmail(email).then(()=>{
            clearInterval(this.timmer);
            this.props.onClose();
        });
    }

    onDraftsEmail = ()=> {
        const email = {
            to:this.state.to,
            from:this.state.from,
            subject: this.state.subject,
            body: this.state.body,
            folder: 'drafts'
        }
        if(this.state.id) email.id=this.state.id;
        emailsService.updateEmail(email).then((id)=>{
            this.setState({id})
            this.props.reload();
        });
    }
    

    render() {
        return (
            <div className="add-email">
                <div>
                    <h2>New Message</h2>
                    <button className="add-email-close-btn" onClick={this.close}></button>
                </div>
                <form onSubmit={this.onSendEmail}>
                    <input type="search" name="to" placeholder="To" value={this.state.to} onChange={this.handleChange} />
                    <input type="text" name="subject" placeholder="Subject" value={this.state.subject} onChange={this.handleChange} />
                    <textarea className="add-email-txt" rows="5" name="body" placeholder="Email message" value={this.state.message} onChange={this.handleChange}></textarea>
                    <button className="send-btn">Send</button>
                </form>
            </div>
        )
    }
}
