import { keepService } from '../services/note.service.js';

export class NoteFilter extends React.Component {
    state = {
        text: '',
        type:null,
    };

    handleChange = ({ target }) => {
        if (target.value.trim() === '')
            keepService.query().then((res) => {
                this.setState({ text: '' });
                this.props.onFilter(res);
            });
        else
            this.setState({ text: target.value }, () => {
                keepService.query({ text: this.state.text }).then((res) => {
                    this.props.onFilter(res);
                });
            });
    };

    onFilter=()=>{
        keepService.query({ text: this.state.text,type:this.state.type })
        .then((res) => {
            this.props.onFilter(res);
        });
    };

    onSubmit = (ev) => {
        ev.preventDefault();
    };

    onBtn=({target})=>{
        this.setState({type:target.id})
    }

    render() {
        return (
            <form className='filter-form' onSubmit={this.onSubmit}>
                <label htmlFor='filter-text'>Filter:</label>
                <input type='search' id='filter-text' value={this.state.text} onChange={this.handleChange} />
                <div className='filter-type-btns'>
                    <div id='note-txt' title='Text' onClick={this.onBtn}></div>
                    <div id='note-img' title='Image' onClick={this.onBtn}></div>
                    <div id='note-todos' title="Todo's" onClick={this.onBtn}></div>
                    <div id='note-video' title='Video' onClick={this.onBtn}></div>
                    <div id='note-audio' title='Audio' onClick={this.onBtn}></div>
                </div>
            </form>
        );
    }
}
