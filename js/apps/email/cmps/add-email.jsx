import { emailsService } from "../service/email.service.js";
import {utilService} from "../../../services/util.service.js"

export class AddEmail extends React.Component {
    state = {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        from: 'mahatmagandi@appsus.com',
        to: 'Mahatma Gandi'
    }

    componentDidMount() {
        
    }
    
    handleChange = (ev) => {
        // this.starField.current.checked=true
        
        const field = ev.target.name;
        console.log('ev.target.name, ev.target.value:',ev.target.name, ev.target.value);
        this.setState({ [field]: ev.target.value },()=>console.log(this.state) );
    };

    onSaveEmail = (ev)=>{
        ev.preventDefault()
        const {subject, body, isRead, sentAt, from, to} = this.state
        const id = utilService.makeId();
        const messageToSave={id, subject, body, isRead, sentAt: new Date(), from, to};
        console.log('props: ',this.props);
        console.log('ev: ',ev);
        emailsService.addEmail(messageToSave).then(()=>{
            clearInterval(blabla);
            this.props.onClose();
        });
        
    }
    

    render() {
        return (
            <div className="add-email">
                <div>
                    <h2>New Message</h2>
                    <button className="add-email-close-btn"></button>
                </div>
                <form onSubmit={this.onSaveEmail}>
                    <input type="search" name="to" placeholder="To" value={this.state.to} onChange={this.handleChange} />
                    <input type="text" name="subject" placeholder="subject" value={this.state.subject} onChange={this.handleChange} />
                    <textarea className="add-email-txt" rows="5" name="body" value={this.state.message} onChange={this.handleChange}></textarea>
                    <button className="send-btn">Send</button>
                </form>
            </div>
        )
    }
}
