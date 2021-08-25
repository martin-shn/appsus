import {emailsService} from '../service/email.service.js'
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

    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps: ', prevProps);
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail();
        }
    }

    loadEmail = () => {
        console.log(this.props);
        const id = this.props.match.params.emailId;
        emailsService.getEmailById(id).then((email) => {
            console.log(email);
            if (!email) this.props.history.push('/email');
            this.setState({ email });
        });
    };

    render(){
        const {email} = this.state
        // if (!email) return <React.Frafmant></React.Frafmant>
        return(
            <table className="email-details">
                <tbody>

                <tr>
                    <td className="email-subject">{email.subject}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{email.from}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{email.body}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        )
    }
}