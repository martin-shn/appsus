import {NotePreview} from './note-preview.jsx'

export function NoteList({onSelectNote,notes}){
    return (
        <div className="note-list">
            {notes.map(note=> <NotePreview key={note.id} onSelectNote={onSelectNote} note={note}/>)}
        </div>
    )
}
