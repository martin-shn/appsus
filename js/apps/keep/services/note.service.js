import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const keepService = {
    query,
    getNoteById,
    removeNote,
    updateNote
    // gotoNote,
};

const notes = [
    {
        id: 'n101',
        type: 'note-txt',
        isPinned: true,
        info: {
            txt: 'Fullstack Me Baby!',
            title: 'tets'
        },
    },
    {
        id: 'n102',
        type: 'note-img',
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me',
        },
        style: {
            backgroundColor: '#00d',
        },
    },
    {
        id: 'n103',
        type: 'note-todos',
        info: {
            label: 'Get my stuff together',
            todos: [
                { txt: 'Driving liscence', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 },
            ],
        },
    },
    {
        id: 'n104',
        type: 'note-video',
        info: {
            title: 'Some video',
            src:'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        },
    },
    {
        id: 'n105',
        type: 'note-video',
        info: {
            title: 'Youtube video',
            src:'https://www.youtube.com/embed/IdqRXjCpFJk',
        },
    },
    {
        id: 'n106',
        type: 'note-audio',
        info: {
            title: 'Lets hear audio',
            src:'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
        },
    },
];

let gNotes;
_loadNotes();

function query(filterBy) {
    if (filterBy) {
        let { filterName, minPrice, maxPrice } = filterBy;
        filterName = filterName ? filterName : '';
        maxPrice = maxPrice ? +maxPrice : Infinity;
        minPrice = minPrice ? +minPrice : 0;
        const filteredBooks = gBooks.filter(
            (book) =>
                book.title.toLowerCase().includes(filterName.toLowerCase()) && book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice
        );
        return Promise.resolve(filteredBooks);
    } else return Promise.resolve(gNotes);
}

function getNoteById(noteId) {
    const note = gNotes.find((note) => note.id === noteId);
    if (!note) return Promise.resolve(null);
    else return Promise.resolve(note);
}

// function gotoNote(noteId,step){
//     const noteIdx=gNotes.findIndex(note=>note.id===noteId);
//     if (noteIdx+step>=gNotes.length) return Promise.resolve(gNotes[0].id);
//     if (noteIdx+step<0) return Promise.resolve(gNotes[gNotes.length-1].id);
//     return Promise.resolve(gNotes[noteIdx+step].id);
// }

function addNote(type, info) {
    const noteToSave = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info,
    };
    gNotes.unshift(noteToSave);
    _saveNotes();
    return Promise.resolve(noteToSave);
}

function updateNote(noteToUpdate){
    const noteIdx = gNotes.findIndex((note) => note.id === noteToUpdate.id);
    gNotes.splice(noteIdx, 1, noteToUpdate);
    _saveNotes();
    return Promise.resolve();
}

function removeNote(noteId) {
    const noteIdx = gNotes.findIndex((note) => note.id === noteId);
    gNotes.splice(noteIdx, 1);
    _saveNotes();
    return Promise.resolve();
}

function _loadNotes() {
    gNotes = storageService.loadFromStorage('appSusDB');
    if (!gNotes) {
        gNotes = notes;
        _saveNotes();
    }
}

function _saveNotes() {
    storageService.saveToStorage('appSusDB', gNotes);
}
