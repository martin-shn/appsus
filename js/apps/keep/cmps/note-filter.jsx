import { keepService } from '../services/note.service.js';

export class NoteFilter extends React.Component {
    state = {
        text: '',
        type:null,
    };

    handleChange = ({ target }) => {
            this.setState({ text: target.value },()=>this.onFilter());
    };

    onFilter=()=>{
        // if(this.state.text.trim()==='') keepService.query().then((res)=>this.props.onFilter(res))
        // else 
        keepService.query({ text: this.state.text,type:this.state.type })
        .then((res) => {
            this.props.onFilter(res);
        });
    };

    onSubmit = (ev) => {
        ev.preventDefault();
    };

    onBtn=({target})=>{
        if(target.id==='clear') this.setState({type:null},()=>this.onFilter())
        else this.setState({type:target.id},()=>this.onFilter())
    }

    render() {
        return (
            <form className='filter-form' onSubmit={this.onSubmit}>
                <label htmlFor='filter-text'>Filter:</label>
                <input type='search' id='filter-text' value={this.state.text} onChange={this.handleChange} autoComplete="off"/>
                <div className='filter-type-btns'>
                    <input type="radio" name="filter" id='note-txt' title='Text' onClick={this.onBtn}/>
                    <input type="radio" name="filter" id='note-img' title='Image' onClick={this.onBtn}/>
                    <input type="radio" name="filter" id='note-todos' title="Todo's" onClick={this.onBtn}/>
                    <input type="radio" name="filter" id='note-video' title='Video' onClick={this.onBtn}/>
                    <input type="radio" name="filter" id='note-audio' title='Audio' onClick={this.onBtn}/>
                    <input type="radio" name="filter" id='clear' title='Show all' onClick={this.onBtn}/>
                </div>
            </form>
        );
    }
}
