import {eventBusService} from '../services/event-bus-service.js'
const { Link } = ReactRouterDOM;

export class UserMsg extends React.Component {
    state = {
        msg: null,
    }

    timeoutId;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('user-msg', 
        (msg)=>{
            this.setState({msg},()=>{
                if(this.state.msg.timer>0)
                this.timeoutId=setTimeout(this.onCloseMsg,this.state.msg.timer)})
        })
    }

    
  componentWillUnmount() {
    this.removeEventBus()
  }
    
    onCloseMsg = () => {
        this.setState({ msg: null })
        clearTimeout(this.timeoutId)
      }

    render(){
        const { msg } = this.state
        if (!msg) return <React.Fragment></React.Fragment>
        // A new book is added: <Link to="/">${book.volumeInfo.title}</Link>
        return (
            <section className={`user-msg ${msg.type || ''}`}>
                <h1>{msg.txt}</h1>
                {this.state.msg.id && <Link to={`/${this.state.msg.id}`} onClick={this.onCloseMsg}>{this.state.msg.link}</Link>}
                {/* <h1>A new book is added: <Link to="/">${book.volumeInfo.title}</Link></h1> */}
                <button onClick={this.onCloseMsg}>X</button>
            </section>
        )
    }
}

// classes supported:  error,success,info
