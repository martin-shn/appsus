import { NotePreview } from './note-preview.jsx';

export function NoteList({ onSelectNote, notes, reload }) {
    return (
        <React.Fragment>
            <div className="note-list pinned-notes">
                {notes.map((note) => {
                    return note.isPinned && (
                            <NotePreview key={note.id} onSelectNote={onSelectNote} note={note} reload={reload}/>
                    );
                })}
            </div>
            <div className='note-list'>
                {notes.map((note) => {
                    return !note.isPinned && <NotePreview key={note.id} onSelectNote={onSelectNote} note={note} reload={reload}/>;
                })}
            </div>
        </React.Fragment>
    );
}
