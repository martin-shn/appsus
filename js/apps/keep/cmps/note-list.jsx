import { NotePreview } from './note-preview.jsx';

export function NoteList({ onSelectNote, notes, reload, onRemove }) {
    return (
        <React.Fragment>
            <div className="note-list pinned-notes">
                {notes.map((note) => {
                    return note.isPinned && (
                            <NotePreview key={note.id} onSelectNote={onSelectNote} note={note} reload={reload} onRemove={onRemove}/>
                    );
                })}
            </div>
            <div className='note-list'>
                {notes.map((note) => {
                    return !note.isPinned && <NotePreview key={note.id} onSelectNote={onSelectNote} note={note} reload={reload} onRemove={onRemove}/>;
                })}
            </div>
        </React.Fragment>
    );
}
