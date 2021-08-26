import { storageService } from "../../../services/storage.service.js"

export const emailsService = {
    query,
    getEmailById,
    addEmail,
    removeEmail,
    onToggleRead
}

const emails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'Lover',
        to: 'momo@momo.com'
    },
    {
        id: 'e102',
        subject: 'Promotion day!',
        body: 'Get the best deals',
        isRead: false,
        sentAt: 1551133930594,
        from: 'Best Buy',
        to: 'momo@momo.com'
    },
    {
        id: 'e103',
        subject: 'Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door',
        isRead: false,
        sentAt: 1551133930594,
        from: 'Nike',
        to: 'momo@gmail.com'
    }
]



let gEmails;
_loadEmails();

function query(filterInput) {
    if (filterInput) {
        const filteredEmails = gEmails.filter(
            (email) =>
                email.from.toLowerCase().includes(filterInput.toLowerCase())
        );
        return Promise.resolve(filteredEmails);
    } else return Promise.resolve(gEmails);
}


export const loggedInUser = {
    email: 'mahatmagandi@appsus.com',
    fullname: 'Mahatma Gandi'
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

function removeEmail(emailId,idx) {
    // const idx = gEmails.findIndex(email=>email.id===emailId);
    gEmails.splice(idx,1)
    _saveEmails
}   

function onToggleRead(emailId) {
    getEmailById(emailId).then(()=>console.log(this.email.isRead))
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
