export class AddTodoList extends React.Component {
    state = {
        todos: this.props.todos,
        // newTodo:{txt:'',doneAt:null},
    };
    
    refLastInput;

    componentDidMount() {
        this.addTodo();
        this.refLastInput=React.createRef();
    }

    addTodo = () => {
        let todos = this.state.todos;
        if (todos.length > 0 && todos[todos.length - 1].txt.trim() === '') {
            this.refLastInput.current.focus();
            return;
        }
        todos.push({ txt: '', doneAt: null });
        this.setState({ todos });
    };

    handleChangel = ({ target }) => {
        let todos = this.state.todos;
        todos[target.id].doneAt = todos[target.id].doneAt ? null : Date.now();
        this.setState({ todos }, () => console.log(this.state));
    };
    handleTxtChange = (ev) => {
        let todos = this.state.todos;
        todos[ev.target.id] = { txt: ev.target.value, doneAt: todos[ev.target.id].doneAt };
        this.setState({ todos }, () => console.log(this.state));
    };
    handleKeyUp = ({ key }) => {
        if (key === 'Enter') this.addTodo();
    };

    render() {
        const todos = this.state.todos;
        const newTodo = this.state.newTodo;
        return (
            <div className='add-todo-list'>
                {/* <onSubmit={this.addTodo}> */}
                <ul>
                    {todos.map((todo, idx) => (
                        <li key={idx}>
                            <input id={idx} type='checkbox' checked={todo.doneAt ? true : false} onChange={this.handleChangel} />
                            <input
                                id={idx}
                                type='text'
                                value={todo.txt}
                                autoFocus
                                onChange={this.handleTxtChange}
                                onKeyUp={this.handleKeyUp}
                                placeholder='A new item'
                                ref={this.refLastInput}
                            />
                        </li>
                    ))}
                    <li>
                        <input type='checkbox' onClick={this.addTodo} onChange={this.addTodo} />
                        <input type='text' onClick={this.addTodo} onKeyDown={this.addTodo} placeholder='Click here to add a new item' />
                    </li>
                </ul>
            </div>
        );
    }
}
