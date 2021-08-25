export class AddNote extends React.Component {
    state = {
        note: null,
    };

    onAddNote = () => {
        this.setState({ note: {type:'note-txt', info:{title:''}} });
    };

    onBtn = ({ target }) => {
        this.setState({ note: {...this.state.note, type: target.name } });
    };

    closeAddNote = () => {
        this.setState({ note: null });
    };

    handleChange=({target})=>{
        switch (target.name){
            case 'title':
                this.setState({note:{...this.state.note,info:{...this.state.note.info,title:target.value}}}
                    ,()=>console.log(this.state.note))
                break
            case 'txt':
                this.setState({note:{...this.state.note,info:{...this.state.note.info,txt:target.value}}}
                    ,()=>console.log(this.state.note))
            break
        }
    }
    render() {
        const note = this.state.note;
        return (
            <React.Fragment>
                {!this.state.note && (
                    <div className='add-note-btn' onClick={this.onAddNote}>
                        +
                    </div>
                )}
                {this.state.note && (
                    <div className='add-note'>
                        <button onClick={this.closeAddNote}>X</button>
                        <input type='text' id='title' name='title' onChange={this.handleChange} value={note.info.title} placeholder='Note title' />
                        <textarea id='txt' name='txt' onChange={this.handleChange} placeholder='Note goes here' />
                        <button name='note-txt' onClick={this.onBtn}>
                            txt
                        </button>
                        <button name='note-img' onClick={this.onBtn}>
                            pic
                        </button>
                        <button name='note-todos' onClick={this.onBtn}>
                            todo
                        </button>
                        <button name='note-video' onClick={this.onBtn}>
                            video
                        </button>
                        <button name='note-audio' onClick={this.onBtn}>
                            audio
                        </button>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
