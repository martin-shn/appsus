export class NoteFilter extends React.Component{

    state={
        text:'',
    }

    handleChange=({target})=>{
        this.setState({text:target.value});
    }

    onSubmit=(ev)=>{
        ev.preventDefault();
    }
    render(){
        return(
            <form className="filter-form" onSubmit={this.onSubmit}>
                <label htmlFor="filter-text">Filter:</label>
                <input type="search" id="filter-text" value={this.state.text} onChange={this.handleChange}/>
            </form>
        )
    }



}
