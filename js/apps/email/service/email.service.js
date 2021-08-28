import { storageService } from "../../../services/storage.service.js"
import { utilService } from '../../../services/util.service.js';

const PURGETIME = 1000*60*60*24*30;

export const emailsService = {
    query,
    getEmailById,
    addEmail,
    removeEmail,
    onToggleRead,
    // toggleMarkAsUnread,
    getStarredEmails,
    onToggleStarred,
    getLoggedUser,
    onUndelete,
    purgeEmail,
    updateEmail,
}

const emails = [
    {
        id: 'e101',
        subject: 'Inbox > Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStarred:false,
        folder: 'inbox',
        removeAt:null,
        sentAt: 1551133930594,
        from: 'Lover',
        to: 'momo@gmail.com'
    },
    {
        id: 'e102',
        subject: 'Inbox > Promotion day!',
        body: 'Get the best deals',
        isRead: false,
        isStarred:true,
        folder: 'inbox',
        removeAt: null,
        sentAt: 1551133930594,
        from: 'Best Buy',
        to: 'momo@momo.com'
    },
    {
        id: 'e103',
        subject: 'Inbox > Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door',
        isRead: false,
        isStarred:false,
        folder: 'inbox',
        sentAt: 1551133930594,
        removeAt: null,
        from: 'Nike',
        to: 'momo@gmail.com'
    },
    {
        id: 'e104',
        subject: 'Inbox > Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door',
        isRead: false,
        isStarred:false,
        folder: 'inbox',
        sentAt: 1551133930594,
        removeAt: null,
        from: 'Nike',
        to: 'momo@gmail.com'
    },
    {
        id: 'e105',
        subject: 'Sent Email - Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door',
        isRead: false,
        isStarred:true,
        folder: 'sent',
        sentAt: 1551133930594,
        removeAt: null,
        from: 'mahatmagandi@appsus.com',
        to: 'momo@gmail.com'
    },
    {
        id: 'e106',
        subject: 'Draft email - Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, ',
        isRead: false,
        isStarred:false,
        folder: 'drafts',
        sentAt: 1551133930594,
        removeAt: null,
        from: 'Nike',
        to: 'momo@gmail.com'
    }
]

export const loggedInUser = {
    email: 'mahatmagandi@appsus.com',
    fullname: 'Mahatma Gandi'
}


let gEmails;
_loadEmails();

function query(filterInput) {
    if (filterInput && filterInput.trim().length>0) {
        // const {text,subject} = filterInput;
        const filteredEmails = gEmails.filter(
            (email) =>
                email.from.toLowerCase().includes(filterInput.trim().toLowerCase()) ||
                email.subject.toLowerCase().includes(filterInput.trim().toLowerCase())||
                email.body.toLowerCase().includes(filterInput.trim().toLowerCase())
                
        );
        return Promise.resolve(filteredEmails);
    } else {
        _loadEmails();
        return Promise.resolve(gEmails);
    }
}

function getLoggedUser(){
    return loggedInUser;
}

function getStarredEmails(){
    const starredEmails = gEmails.filter(email=>email.isStarred)
    return Promise.resolve(starredEmails)
}


function getEmailById(emailId) {
    const email = gEmails.find((email) => email.id === emailId);
    if (!email) return Promise.resolve(null);
    else return Promise.resolve(email);
}

function addEmail(email) {
    email.id=utilService.makeId()
    email.isRead= true;
    email.isStarred=false;
    if(!email.folder) email.folder= 'sent';
    email.sentAt= Date.now();
    email.removeAt= null;
    gEmails.push(email)
    _saveEmails()
    return Promise.resolve()
}

function updateEmail(email){
    const id = email.id ? email.id : utilService.makeId()
    email.id=id
    email.isRead= true;
    email.isStarred=false;
    if(!email.folder) email.folder= 'drafts';
    if(!email.sentAt) email.sentAt= null;
    email.removeAt= null;
    const idx = gEmails.findIndex(email=>email.id===id);
    if(idx>=0) gEmails.splice(idx,1,email)
    else gEmails.push(email)
    _saveEmails()
    return Promise.resolve(id)
}

function onUndelete(emailId){
    const idx = gEmails.findIndex(email=>email.id===emailId);
    gEmails[idx].removeAt=null
    gEmails[idx].folder='inbox'
    _saveEmails()
    return Promise.resolve()    
}

function removeEmail(emailId) {
    const idx = gEmails.findIndex(email=>email.id===emailId);
    gEmails[idx].removeAt=Date.now()
    gEmails[idx].folder='deleted'
    _saveEmails()
    return Promise.resolve()    
}   

function purgeEmail(emailId) {
    const idx = gEmails.findIndex(email=>email.id===emailId);
    gEmails.splice(idx,1)
    _saveEmails()
    return Promise.resolve()    
}   

function onToggleRead(emailId) {
    const idx = gEmails.findIndex(email=>email.id===emailId);
    gEmails[idx].isRead=!gEmails[idx].isRead;
    _saveEmails()
    return Promise.resolve()
}

function onToggleStarred(emailId) {
    const idx = gEmails.findIndex(email=>email.id===emailId);
    gEmails[idx].isStarred = !gEmails[idx].isStarred;
    _saveEmails()
    return Promise.resolve()
}

function _loadEmails() {
    gEmails = storageService.loadFromStorage('emailsDB')
    if (!gEmails) {
        gEmails = emails
    }
    
    gEmails.forEach((email,idx)=>{
        if (email.removeAt && email.removeAt+1000*60<Date.now()) gEmails.splice(idx,1);
    })
    
    _saveEmails()
}

function _saveEmails() {
    storageService.saveToStorage('emailsDB', gEmails)
}

