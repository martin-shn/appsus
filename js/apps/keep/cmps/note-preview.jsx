import { Loader } from '../../../cmps/loader.jsx';
import { keepService } from '../services/note.service.js';
import { utilService } from '../../../services/util.service.js';
import { eventBusService } from '../../../services/event-bus-service.js';
import { Palette } from './palette.jsx';

export class NotePreview extends React.Component {
    state = {
        note: null,
        isPalette: false,
        isEdit:false,
    };

    componentDidMount() {
        this.setState({ note: this.props.note });
        this.removeEventBus = eventBusService.on('update-note', (note) => {
            if (note.id === this.state.note.id) this.setState({ note });
        });
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    handleChangeTodo = ({ target }) => {
        let tempTodos = this.state.note.info.todos;
        tempTodos[+target.id].doneAt = tempTodos[+target.id].doneAt ? null : Date.now();
        this.setState({ note: { ...this.state.note, info: { ...this.state.note.info, todos: tempTodos } } }, () =>
            keepService.updateNote(this.state.note)
        );
    };

    getTodoList = (todos) => {
        return todos.map((todo,idx) => {
            const id=String(idx).padStart(2,0)
            return <li key={id}>
                <input type='checkbox' checked={todo.doneAt ? true : false} onChange={this.handleChangeTodo} id={id} />
                <label htmlFor={id}>{todo.txt}</label>
            </li>
        });
    };

    onPalette = () => {
        this.setState({ isPalette: !this.state.isPalette });
    };

    onPaletteColor = (color) => {
        this.setState({ note: { ...this.state.note, style: { backgroundColor: color } } }, () => keepService.updateNote(this.state.note));
    };

    onPin = () => {
        console.log('pinned');
        // if (this.state.note.isPinned) {
            this.setState({ note: { ...this.state.note, isPinned: !this.state.note.isPinned } }, () => {
                keepService.updateNote(this.state.note)
                this.props.reload();
            });
        // }
    };

    onRemove=({target})=>{
        this.props.onRemove(target.id);
    }

    onEdit=({target})=>{
        if(this.state.isEdit) this.setState({isEdit:null})
        else this.setState({isEdit:target.id})
    }

    handleChange=({target})=>{
        let note = this.state.note;
        note.info[target.id]=target.value;
        this.setState({note},()=>keepService.updateNote(this.state.note))
    }

    render() {
        if (!this.state.note) return <Loader />;
        const note = this.state.note;
        const isEdit=this.state.isEdit;
        return (
            <div className={`note ${(note.isPinned)?'pinned':'not-pinned'}`} style={note.style}>
                <div className={`pin-icon ${(note.isPinned)?'pinned':'not-pinned'}`} onClick={this.onPin}></div>

                {note.info.title && !isEdit&& <p id="title" className='note-title' onClick={this.onEdit}>{note.info.title}</p>}
                {isEdit==='title' && <input className='note-title' id="title" autoFocus onChange={this.handleChange} onBlur={this.onEdit} value={note.info.title}/>}
                
                {note.type === 'note-txt' && !isEdit && <p id="txt" onClick={this.onEdit}>{note.info.txt}</p>}
                {isEdit==='txt' && note.type==='note-txt' && <textarea onBlur={this.onEdit} id="txt" autoFocus onChange={this.handleChange} value={note.info.txt}/>}
                
                {note.type === 'note-img' && <img src={note.info.src} />}
                {note.type === 'note-todos' && (
                    <React.Fragment>
                        <p>{note.info.label}</p>
                        <ul>{this.getTodoList(note.info.todos)}</ul>
                    </React.Fragment>
                )}
                {note.type === 'note-video' && !note.info.src.includes('www.youtube.com') && (
                    <video controls>
                        <source src={note.info.src} />
                    </video>
                )}
                {note.type === 'note-video' && note.info.src.includes('www.youtube.com') && (
                    <iframe
                        src={note.info.src}
                        frameBorder='0'
                        // allow='accelerometer; clipboard-write; gyroscope; picture-in-picture'
                        allowFullScreen
                    ></iframe>
                )}
                {note.type === 'note-audio' && (
                    <audio controls>
                        <source src={note.info.src} />
                    </audio>
                )}

                <div className='sub-menu'>
                    <div className='palette-note icon' onClick={this.onPalette}></div>
                    <div className='delete-note icon' id={`${note.id}`} onClick={this.onRemove}></div>
                    {this.state.isPalette && (
                        <Palette onPaletteColor={this.onPaletteColor} onMouseLeave={() => this.setState({ isPalette: false })} />
                    )}
                </div>
            </div>
        );
    }
}
