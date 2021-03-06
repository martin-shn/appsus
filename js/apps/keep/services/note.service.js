import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const keepService = {
    query,
    getNoteById,
    removeNote,
    updateNote,
    duplicateNote,
    // gotoNote,
};

const notes = [
    {
        "id": "wFS9B",
        "type": "note-todos",
        "isPinned": false,
        "style": {
            "backgroundColor": "#f94144"
        },
        "info": {
            "title": "קניות לשבת",
            "label": "מבצעים בשופרסל",
            "todos": [
                {
                    "txt": "חלב",
                    "doneAt": null,
                    "id": "pZt01"
                },
                {
                    "txt": "לחם",
                    "doneAt": null,
                    "id": "8S8kE"
                },
                {
                    "txt": "סוכר",
                    "doneAt": null,
                    "id": "0pTxv"
                },
                {
                    "txt": "מלח",
                    "doneAt": null,
                    "id": "3OvtE"
                }
            ]
        }
    },
    {
        "id": "n101",
        "type": "note-txt",
        "isPinned": true,
        "style": {
            "backgroundColor": "#FFC6FF"
        },
        "info": {
            "title": "tets",
            "txt": "Fullstack Me Baby!"
        }
    },
    {
        "id": "n102",
        "type": "note-img",
        "style": {
            "backgroundColor": "#FFFFFC"
        },
        "info": {
            "title": "Bobi and Me"
        }
    },
    {
        "id": "n103",
        "type": "note-todos",
        "style": {
            "backgroundColor": "#CAFFBF"
        },
        "info": {
            "label": "Get my stuff together",
            "todos": [
                {
                    "txt": "Driving liscence",
                    "doneAt": null,
                    "id": "us34g"
                },
                {
                    "txt": "Coding power",
                    "doneAt": 187111111,
                    "id": "4gfds"
                }
            ]
        }
    },
    {
        "id": "n104",
        "type": "note-video",
        "info": {
            "title": "Some video",
            "src": "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
        }
    },
    {
        "id": "n105",
        "type": "note-video",
        "style": {
            "backgroundColor": "#FDFFB6"
        },
        "info": {
            "title": "Youtube video",
            "src": "https://www.youtube.com/embed/IdqRXjCpFJk"
        }
    },
    {
        "id": "n106",
        "type": "note-audio",
        "style": {
            "backgroundColor": "#A0C4FF"
        },
        "info": {
            "title": "Lets hear audio",
            "src": "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
        }
    },
    {
        "id": "n10111",
        "type": "note-txt",
        "isPinned": true,
        "style": {
            "backgroundColor": "#FFFFFC"
        },
        "info": {
            "title": "tets",
            "txt": "Fullstack Me Baby!"
        }
    },
    {
        "id": "n10211",
        "type": "note-img",
        "style": {
            "backgroundColor": "#FFADAD"
        },
        "info": {
            "title": "Bobi and Me"
        }
    },
    {
        "id": "n103fgfd",
        "type": "note-todos",
        "info": {
            "label": "Get my stuff together",
            "todos": [
                {
                    "txt": "Driving liscence",
                    "doneAt": null,
                    "id": "us34g"
                },
                {
                    "txt": "Coding power",
                    "doneAt": 187111111,
                    "id": "4gfds"
                }
            ]
        }
    },
    {
        "id": "n10443",
        "type": "note-video",
        "info": {
            "title": "Some video",
            "src": "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
        }
    },
    {
        "id": "n105gt453",
        "type": "note-video",
        "style": {
            "backgroundColor": "#FFD6A5"
        },
        "info": {
            "title": "Youtube video",
            "src": "https://www.youtube.com/embed/IdqRXjCpFJk"
        }
    },
    {
        "id": "n106g45",
        "type": "note-audio",
        "info": {
            "title": "Lets hear audio",
            "src": "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
        }
    },
    {
        "id": "n10145tg",
        "type": "note-txt",
        "isPinned": true,
        "style": {
            "backgroundColor": "#FFD6A5"
        },
        "info": {
            "title": "tets",
            "txt": "Fullstack Me Baby!"
        }
    },
    {
        "id": "n102fg45",
        "type": "note-img",
        "info": {
            "url": "http://some-img/me",
            "title": "Bobi and Me"
        },
        "style": {
            "backgroundColor": "#00d"
        }
    },
    {
        "id": "n103fdsz",
        "type": "note-todos",
        "style": {
            "backgroundColor": "#FFC6FF"
        },
        "info": {
            "label": "Get my stuff together",
            "todos": [
                {
                    "txt": "Driving liscence",
                    "doneAt": null,
                    "id": "us34g"
                },
                {
                    "txt": "Coding power",
                    "doneAt": 187111111,
                    "id": "4gfds"
                }
            ]
        }
    },
    {
        "id": "n103234",
        "type": "note-video",
        "style": {
            "backgroundColor": "#FDFFB6"
        },
        "info": {
            "title": "Some video",
            "src": "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
        }
    },
    {
        "id": "n10rffg5",
        "type": "note-video",
        "info": {
            "title": "Youtube video",
            "src": "https://www.youtube.com/embed/IdqRXjCpFJk"
        }
    },
    {
        "id": "n10grtgyh6",
        "type": "note-audio",
        "style": {
            "backgroundColor": "#FDFFB6"
        },
        "info": {
            "title": "Lets hear audio",
            "src": "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
        }
    }
];

let gNotes;
_loadNotes();

function query(filterBy) {
    if (filterBy) {
        let { text, type } = filterBy;
        let filterText, filterType;
        filterText = text ? text : '';
        filterType = type ? type : null;
        if (filterText.trim() === '' && !filterType) return Promise.resolve(gNotes);

        let filteredNotes;

        if (filterText && !filterType)
            filteredNotes = gNotes.filter(
                (note) =>
                    (note.info.title && note.info.title.toLowerCase().includes(filterText.toLowerCase())) ||
                    (note.info.txt && note.info.txt.toLowerCase().includes(filterText.toLowerCase())) ||
                    (note.info.label && note.info.label.toLowerCase().includes(filterText.toLowerCase()))
            );
        else if (!filterText && filterType) filteredNotes = gNotes.filter((note) => note.type === filterType);
        else
            filteredNotes = gNotes.filter(
                (note) =>
                    ((note.info.title && note.info.title.toLowerCase().includes(filterText.toLowerCase())) ||
                        (note.info.txt && note.info.txt.toLowerCase().includes(filterText.toLowerCase())) ||
                        (note.info.label && note.info.label.toLowerCase().includes(filterText.toLowerCase()))) &&
                    note.type === filterType
            );

        return Promise.resolve(filteredNotes);
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
    const id = utilService.makeId();
    const noteToSave = {
        id,
        type,
        isPinned: false,
        info,
    };
    gNotes.unshift(noteToSave);
    _saveNotes();
    return noteToSave;
}

function updateNote(noteToUpdate) {
    let note = { id: noteToUpdate.id, type: noteToUpdate.type, isPinned: noteToUpdate.isPinned, style: noteToUpdate.style };
    switch (noteToUpdate.type) {
        case 'note-txt':
            note.info = {
                title: noteToUpdate.info.title,
                txt: noteToUpdate.info.txt,
            };
            break;

        case 'note-todos':
            note.info = {
                title: noteToUpdate.info.title,
                label: noteToUpdate.info.label,
                todos: noteToUpdate.info.todos,
            };
            break;

        case 'note-todos-inline':
            note.type = 'note-todos';
            note.info = {
                title: noteToUpdate.info.title,
                label: noteToUpdate.info.label,
                todos: noteToUpdate.info.todosInline.split(',').map((todo) => {
                    return { txt: todo, doneAt: null };
                }),
            };
            break;

        default:
            note.info = {
                title: noteToUpdate.info.title,
                src: noteToUpdate.info.src,
            };
            break;
    }
    if (!note.id) note = addNote(note.type, note.info);
    else {
        const noteIdx = gNotes.findIndex((n) => n.id === note.id);
        gNotes.splice(noteIdx, 1, note);
        // if (noteIdx) gNotes.splice(noteIdx, 1, noteToUpdate)
        // else {
        //     savedNote = addNote(noteToUpdate.type, noteToUpdate.info);
        // }
        _saveNotes();
    }
    return Promise.resolve(note);
}

function duplicateNote(noteId) {
    const noteIdx = gNotes.findIndex((note) => note.id === noteId);
    let newNote = JSON.parse(JSON.stringify(gNotes[noteIdx]));
    newNote.id = utilService.makeId();
    if(newNote.type==='note-todos'){
        newNote.info.todos.forEach((todo)=>{
            todo.id=utilService.makeId()
        })
    }
    gNotes.splice(noteIdx, 0, newNote);
    _saveNotes();
    return Promise.resolve(newNote);
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
