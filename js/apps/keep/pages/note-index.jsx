import {NoteFilter} from '../cmps/note-filter.jsx'
import {NoteList} from '../cmps/note-list.jsx'
import {AddNote} from '../cmps/add-note.jsx'
import {Loader} from '../../../cmps/loader.jsx'
import {keepService} from '../services/note.service.js'

export class MissKeep extends React.Component{

    state={
        notes:null,
    }

    componentDidMount() {
        this.loadNotes();
    }
    
    loadNotes=()=>{
        keepService.query().then(notes=>this.setState({notes}));
    }

    onSelectNote=(note)=>{

    }

    render(){
        if(!this.state.notes) return <Loader/>
        return (
            <section className="miss-keep">
                <NoteFilter/>
                <NoteList notes={this.state.notes} onSelectNote={this.onSelectNote}/>
                <AddNote />
            </section>
        )
    }



}
