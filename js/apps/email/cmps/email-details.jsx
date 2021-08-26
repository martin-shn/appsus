import { emailsService } from '../service/email.service.js'
export class EmailDetails extends React.Component {
    state = {
        email: {
            id: 'e102',
            subject: 'Promotion day!',
            body: 'Get the best deals',
            isRead: false,
            sentAt: 1551133930594,
            from: 'Best Buy',
            to: 'momo@momo.com'
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
        this.setState({email:this.props.email})
    };

    onBtn=()=>{
        this.props.dueFunc()
    }
    render() {
        console.log('curremail',this.props.email);
        const { email } = this.state
        // if (!email) return <React.Frafmant></React.Frafmant>
        email.isRead = true
        return (
            <table className="email-details">
                
                <button onClick={this.onBtn}>⬅</button>
                    <thead><tr><td></td></tr></thead>
                <tbody>
                <tr className="email-subject"><td className="details-body">Subject: {email.subject}</td></tr>
                <tr><td className="details-body">From: {email.from}</td></tr>
                <tr><td className="details-body">Message: {email.body}</td></tr>
                </tbody>
            </table>
        )
    }
}