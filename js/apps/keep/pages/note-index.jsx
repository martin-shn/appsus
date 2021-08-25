import {NoteFilter} from '../cmps/note-filter.jsx'
import {NoteList} from '../cmps/note-list.jsx'
import {Loader} from '../../../cmps/loader.jsx'

export class MissKeep extends React.Component{

    state={
        notes:null,
    }


    render(){
        if(!this.state.notes) return <Loader/>
        return (
            <section className="miss-keep">
                <NoteFilter/>
                <NoteList notes={this.state.notes}/>

            </section>
        )
    }



}
