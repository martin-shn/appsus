import { emailsService } from "../service/email.service.js";


export class EmailFilter extends React.Component {
    state = {
        filterInput:'',
    }

    handleChange = (ev) => {
        // const filter = ev.target.name;
        this.setState({ filterInput:  ev.target.value  },()=>{
            console.log(this.state);
            this.onFilter();
        });
    };

    onFilter = () => {
        emailsService.query(this.state.filterInput).then((res) => {
                this.props.onSetFilter(res);
            });
    };

    render() {
        return (
            <React.Fragment>
                <input className="search-input" type="search" name="from" placeholder="Search Mail" onChange={this.handleChange}></input>
            </React.Fragment>);
    }
}
