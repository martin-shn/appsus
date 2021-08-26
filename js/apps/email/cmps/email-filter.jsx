export class EmailFilter extends React.Component {
    state = {
        filterInput: ''
    }

    handleChange = (ev) => {
        const filter = ev.target.name;
        this.setState({ filterInput:  ev.target.value  }/*,
            () => {
                this.props.onSetFilter(this.state.filterBy);
            }*/);
            console.log(ev.target.value);
    };

    onFilter = (ev) => {
        ev.preventDefault();
        this.setState({ filterBy: { from: this.state.filterBy.from } },
            () => {
                this.props.onSetFilter(this.state.filterBy);
            });
    };

    render() {
        return (
            <React.Fragment>
                <input type="search" name="from" placeholder="Search Mail" onChange={this.handleChange}></input>
            </React.Fragment>);
    }
}
