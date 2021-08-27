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
    

    handleChange = (ev) => {
        // this.starField.current.checked=true
        
        const field = ev.target.name;
        console.log('ev.target.name, ev.target.value:',ev.target.name, ev.target.value);
        this.setState({ [field]: ev.target.value },()=>console.log(this.state) );
    };

    onSaveEmail = (ev)=>{
        const {subject, body, isRead, sentAt, from, to} = this.state
        ev.preventDefault()
        const id = utilService.makeId();
        const messageToSave={id, subject, body, isRead, sentAt: new Date(), from, to};
        console.log('props: ',this.props);
        console.log('ev: ',ev);
        emailsService.addEmail(messageToSave).then(()=>this.props.history.push(`/email`));
        
    }
    

    render() {
        return (
            <div className="add-email">
                <div>
                    <h2>New Message</h2>
                    <button >x</button>
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