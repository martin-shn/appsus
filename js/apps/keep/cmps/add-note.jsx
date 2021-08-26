import { storageService } from '../../../services/storage.service.js';
import { keepService } from '../services/note.service.js';
import { AddTodoList } from './add-todo-list.jsx';

export class AddNote extends React.Component {
    state = {
        title: '',
        txt: '',
        src: '',
        id: null,
        label: '',
        type: '',
        todosInline: '',
        todos: [],
    };

    onAddNote = () => {
        this.setState({ type: 'note-txt', title: '' });
    };

    onBtn = ({ target }) => {
        switch (target.id) {
            case 'note-txt':
                this.setState({ type: target.id, txt: '' });
                break;
            case 'note-todos':
                this.setState({ type: target.id, label: '', todos: [] });
                break;
            case 'note-todos-inline':
                this.setState(
                    {
                        type: target.id,
                        label: '',
                        todos: [],
                        todosInline: '',
                    }
                );
                break;
            default:
                //img+video+audio
                this.setState({ type: target.id, src: 'http://' });
                break;
        }
    };

    closeAddNote = () => {
        this.setState({
            title: '',
            txt: '',
            src: '',
            id: null,
            label: '',
            type: '',
            todosInline: '',
            todos: [],
        });
    };

    saveNote = () => {
        const noteToSave = {
            id: this.state.id,
            type: this.state.type,
            info: {
                title: this.state.title,
                label: this.state.label,
                txt: this.state.txt,
                src: this.state.src,
                todos: this.state.todos,
                todosInline: this.state.todosInline,
            },
        };
        keepService.updateNote(noteToSave).then((savedNote) => {
            this.setState(
                {
                    title: '',
                    txt: '',
                    src: '',
                    id: null,
                    label: '',
                    type: '',
                    todosInline: '',
                    todos: [],
                },
                () => {
                    this.props.onAddNote();
                }
            );
        });
    };

    handleChange = ({ target }) => {
        switch (target.name) {
            case 'title':
                this.setState({ title: target.value });
                break;
            case 'txt':
                this.setState({ txt: target.value });
                break;
            case 'src':
                this.setState({ src: target.value });
                break;
            case 'label':
                this.setState({ label: target.value });
                break;
            case 'todos-inline':
                this.setState({ todosInline: target.value });
                break;
        }
    };

    onUpdateTodos=(todos)=>{
        if (todos[todos.length-1].txt.trim()==='') todos.pop();
        this.setState({todos})
    }

    render() {
        const note = this.state;
        return (
            <React.Fragment>
                {!this.state.type && (
                    <div className='add-note-btn' onClick={this.onAddNote}>
                        +
                    </div>
                )}
                {this.state.type && (
                    <div className='add-note'>
                        <button onClick={this.closeAddNote}>Discard</button>
                        <button onClick={this.saveNote}>Save</button>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            autoFocus
                            onChange={this.handleChange}
                            value={note.title}
                            placeholder='Note title'
                        />
                        {note.type === 'note-txt' && (
                            <React.Fragment>
                                <label>Image URL:</label>
                                <textarea id='txt' name='txt' onChange={this.handleChange} value={note.txt} placeholder='Note goes here' />
                            </React.Fragment>
                        )}

                        {note.type === 'note-img' && (
                            <React.Fragment>
                                <label>Image URL:</label>
                                <input type='url' id='img' name='src' onChange={this.handleChange} value={note.src} placeholder='Image URL' />
                            </React.Fragment>
                        )}
                        {note.type === 'note-todos' && (
                            <div className='note-todos'>
                                <input
                                    type='text'
                                    id='note-todos-label'
                                    name='label'
                                    onChange={this.handleChange}
                                    value={note.label}
                                    placeholder="Todo's label"
                                />
                                <AddTodoList todos={note.todos} onUpdateTodos={this.onUpdateTodos}/>
                            </div>
                        )}
                        {note.type === 'note-video' && (
                            <React.Fragment>
                                <label>Video URL:</label>
                                <input type='url' id='img' name='src' onChange={this.handleChange} value={note.src} placeholder='Video URL' />
                            </React.Fragment>
                        )}
                        {note.type === 'note-audio' && (
                            <React.Fragment>
                                <label>Audio URL:</label>
                                <input type='url' id='img' name='src' onChange={this.handleChange} value={note.src} placeholder='Audio URL' />
                            </React.Fragment>
                        )}
                        {note.type === 'note-todos-inline' && (
                            <div className='todos-inline'>
                                <input
                                    type='text'
                                    id='note-todos-inline-label'
                                    name='label'
                                    onChange={this.handleChange}
                                    value={note.label}
                                    placeholder="Todo's label"
                                />
                                <input
                                    type='text'
                                    id='note-todos-inline'
                                    name='todos-inline'
                                    onChange={this.handleChange}
                                    value={note.todosInline}
                                    placeholder="Comma seperated Todo's"
                                />
                            </div>
                        )}
                        <div className='type-btns'>
                            <div id='note-txt' title='Text' onClick={this.onBtn}></div>
                            <div id='note-img' title='Image' onClick={this.onBtn}></div>
                            <div id='note-todos' title="Todo's" onClick={this.onBtn}></div>
                            <div id='note-video' title='Video' onClick={this.onBtn}></div>
                            <div id='note-audio' title='Audio' onClick={this.onBtn}></div>
                            <div id='note-todos-inline' title="Todo's (inline)" onClick={this.onBtn}></div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
