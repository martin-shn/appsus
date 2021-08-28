import { storageService } from "../../../services/storage.service.js"

export const emailsService = {
    query,
    getEmailById,
    addEmail,
    removeEmail,
    onToggleRead,
    // toggleMarkAsUnread,
    getStarredEmails,
    onToggleStarred,
    getLoggedUser
}

const emails = [
    {
        id: 'e101',
        subject: 'Inbox > Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStarred:false,
        folder: 'inbox',
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
        from: 'Nike',
        to: 'momo@gmail.com'
    },
    {
        id: 'e106',
        subject: 'Draft email - Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door',
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
    } else return Promise.resolve(gEmails);
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
    gEmails.push(email)
    _saveEmails()
    return Promise.resolve()
}

function removeEmail(emailId) {
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
        _saveEmails()
    }
}

function _saveEmails() {
    storageService.saveToStorage('emailsDB', gEmails)
}

