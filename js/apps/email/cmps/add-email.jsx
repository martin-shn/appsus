import { emailsService } from "../service/email.service";
export class AddEmail extends React.Component {
    state = {
        to: '',
        subject: '',
        message: ''
    }

    handleChange = (ev) => {
        // this.starField.current.checked=true
        
        const field = ev.target.name;
        console.log('ev.target.name, ev.target.value:',ev.target.name, ev.target.value);
        this.setState({ [field]: ev.target.value },()=>console.log(this.state) );
    };

    onSaveEmail = (ev)=>{
        ev.preventDefault()
        const messageToSave={to:this.state.to,subject:this.state.subject,message:this.state.message};
        const id = this.props.match.params.emailId+'s12'
        emailsService.addEmail(messageToSave).then(()=>this.props.history.push(`/email/${id}`));
        
    }
    

    render() {
        return (
            <div className="add-email">
                <div>
                    <h2>New Message</h2>
                </div>
                <form onSubmit={this.onSaveMessage}>
                    <input type="search" name="to" placeholder="To" value={this.state.to} onChange={this.handleChange} />
                    <input type="text" name="subject" placeholder="subject" value={this.state.subject} onChange={this.handleChange} />
                    <textarea rows="5" name="message" value={this.state.message} onChange={this.handleChange}></textarea>
                    <button className="send-btn">Send</button>
                </form>
            </div>
        )
    }
}