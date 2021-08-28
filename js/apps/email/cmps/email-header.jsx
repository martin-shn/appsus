import {EmailFilter} from './email-filter.jsx'
const { Link } = ReactRouterDOM;
export class EmailHeader extends React.Component {
    state = {

    }


    render(){
        return(
            <div className="email-header">
               <Link className="clear-link email-home-link" to='/email'></Link>
               <EmailFilter onSetFilter={this.props.onSetFilter}/> 
            </div>
        )
    }
}