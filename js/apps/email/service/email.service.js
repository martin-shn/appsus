import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

const PURGETIME = 1000 * 60 * 60 * 24 * 30;

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
};

const emails = [
    {
        id: 'e101',
        subject: 'Inbox > Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStarred: false,
        folder: 'inbox',
        removeAt: null,
        sentAt: 1551133930594,
        from: 'Lover',
        to: 'momo@gmail.com',
    },
    {
        id: 'e102',
        subject: 'Inbox > Promotion day!',
        body: 'Get the best deals',
        isRead: false,
        isStarred: true,
        folder: 'inbox',
        removeAt: null,
        sentAt: 1551133930594,
        from: 'Best Buy',
        to: 'momo@momo.com',
    },
    {
        id: 'e103',
        subject: 'Inbox > Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door',
        isRead: false,
        isStarred: false,
        folder: 'inbox',
        sentAt: 1551133930594,
        removeAt: null,
        from: 'Nike',
        to: 'momo@gmail.com',
    },
    {
        id: 'e104',
        subject: 'Inbox > Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door',
        isRead: false,
        isStarred: false,
        folder: 'inbox',
        sentAt: 1551133930594,
        removeAt: null,
        from: 'Nike',
        to: 'momo@gmail.com',
    },
    {
        id: 'e105',
        subject: 'Sent Email - Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door',
        isRead: false,
        isStarred: true,
        folder: 'sent',
        sentAt: 1551133930594,
        removeAt: null,
        from: 'mahatmagandi@appsus.com',
        to: 'momo@gmail.com',
    },
    {
        id: 'e106',
        subject: 'Draft email - Order Received!',
        body: 'Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, Your order’s in. We’re working to get it packed up and out the door, ',
        isRead: false,
        isStarred: false,
        folder: 'drafts',
        sentAt: 1551133930594,
        removeAt: null,
        from: 'Nike',
        to: 'momo@gmail.com',
    },
    {
        id: '1',
        to: 'Liam_Stevens5913@grannar.com',
        body: 'Ethika',
        subject: 'Liam Stevens',
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removeAt: null,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '2',
        to: 'Maya_Rees2317@deavo.com',
        body: 'Cherokee Inc.',
        subject: 'Maya Rees',
        isRead: false,
        sentAt: 1551133930594,
        removeAt: null,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '3',
        to: 'Sebastian_Vinton5248@ovock.tech',
        sentAt: 1551133930594,
        removeAt: null,
        body: 'Brooks Brothers',
        subject: 'Sebastian Vinton',
        isRead: false,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '4',
        to: 'Aeris_Plant7782@typill.biz',
        sentAt: 1551133930594,
        removeAt: null,
        body: 'Forever 21',
        subject: 'Aeris Plant',
        isRead: true,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '5',
        to: 'Daron_Gordon6012@atink.com',
        body: 'Ethika',
        subject: 'Daron Gordon',
        isRead: false,
        sentAt: 1551133930594,
        removeAt: null,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '6',
        to: 'Tony_Partridge998@jiman.org',
        body: 'Max Studio',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'Tony Partridge',
        isRead: true,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '7',
        to: 'Robyn_Andersson8426@naiker.biz',
        body: 'Max Studio',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'Robyn Andersson',
        isRead: true,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '8',
        sentAt: 1551133930594,
        removeAt: null,
        to: 'Evelynn_Hilton8303@irrepsy.com',
        body: 'Converse',
        subject: 'Evelynn Hilton',
        isRead: false,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '9',
        sentAt: 1551133930594,
        removeAt: null,
        to: 'Nicholas_Campbell757@infotech44.tech',
        body: 'Karen Kane',
        subject: 'Nicholas Campbell',
        isRead: false,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '10',
        to: 'Jane_Allwood8335@joiniaa.com',
        sentAt: 1551133930594,
        removeAt: null,
        body: 'Hamilton Shirts',
        subject: 'Jane Allwood',
        isRead: true,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '11',
        to: 'Erick_Jackson9278@eirey.tech',
        body: 'Lee',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'Erick Jackson',
        isRead: false,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '12',
        to: 'Michael_Groves309@cispeto.com',
        body: 'Nudie Jeans',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'Michael Groves',
        isRead: true,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '13',
        to: 'Dasha_Dubois1070@acrit.org',
        body: 'SABA',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'Dasha Dubois',
        isRead: true,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '14',
        to: 'Aiden_Whinter4253@extex.org',
        body: 'Lee',
        subject: 'Aiden Whinter',
        sentAt: 1551133930594,
        removeAt: null,
        isRead: true,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '15',
        to: 'Luna_Bingham5256@kideod.biz',
        body: 'H&M',
        subject: 'Luna Bingham',
        isRead: false,
        sentAt: 1551133930594,
        removeAt: null,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '16',
        to: 'Fred_Duvall1116@yahoo.com',
        body: 'Cherokee Inc.',
        subject: 'Fred Duvall',
        isRead: false,
        sentAt: 1551133930594,
        removeAt: null,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '17',
        sentAt: 1551133930594,
        removeAt: null,
        to: 'Tom_Savage5505@twace.org',
        body: 'Cross Colours',
        subject: 'Tom Savage',
        isRead: true,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '18',
        sentAt: 1551133930594,
        removeAt: null,
        to: 'Johnny_Irwin1964@twipet.com',
        body: 'Tommy Hilfinger',
        subject: 'Johnny Irwin',
        isRead: false,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '19',
        sentAt: 1551133930594,
        removeAt: null,
        to: 'Luna_Utterson4996@nimogy.biz',
        body: 'Nice Collective',
        subject: 'Luna Utterson',
        isRead: false,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '20',
        to: 'Ron_Freeburn75@atink.com',
        sentAt: 1551133930594,
        removeAt: null,
        body: 'Marchesa',
        subject: 'Ron Freeburn',
        isRead: false,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '21',
        to: 'Leanne_Wilton8878@liret.org',
        body: 'Nice Collective',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'Leanne Wilton',
        isRead: true,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '22',
        to: 'Alison_Reynolds4839@ovock.tech',
        body: 'Healthtex',
        subject: 'Alison Reynolds',
        sentAt: 1551133930594,
        removeAt: null,
        isRead: true,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '23',
        to: 'John_Walsh8289@bungar.biz',
        body: 'Koton',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'John Walsh',
        isRead: true,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '24',
        sentAt: 1551133930594,
        removeAt: null,
        to: 'Roger_Porter9252@irrepsy.com',
        body: 'DKNY',
        subject: 'Roger Porter',
        isRead: false,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '25',
        to: 'Analise_Mason9689@acrit.org',
        body: 'Hamilton Shirts',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'Analise Mason',
        isRead: true,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '26',
        to: 'Chad_Morgan3698@zorer.org',
        body: 'Real Gold',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'Chad Morgan',
        isRead: false,
        isStarred: true,
        folder: 'inbox',
        from: 'Martin',
    },
    {
        id: '27',
        to: 'Ramon_Warner1492@supunk.biz',
        body: 'Izod',
        sentAt: 1551133930594,
        removeAt: null,
        subject: 'Ramon Warner',
        isRead: true,
        isStarred: false,
        folder: 'inbox',
        from: 'Martin',
    },
];

export const loggedInUser = {
    email: 'mahatmagandi@appsus.com',
    fullname: 'Mahatma Gandi',
};

let gEmails;
_loadEmails();

function query(filterInput) {
    if (filterInput && filterInput.trim().length > 0) {
        // const {text,subject} = filterInput;
        const filteredEmails = gEmails.filter(
            (email) =>
                email.from.toLowerCase().includes(filterInput.trim().toLowerCase()) ||
                email.subject.toLowerCase().includes(filterInput.trim().toLowerCase()) ||
                email.body.toLowerCase().includes(filterInput.trim().toLowerCase())
        );
        return Promise.resolve(filteredEmails);
    } else {
        _loadEmails();
        return Promise.resolve(gEmails);
    }
}

function getLoggedUser() {
    return loggedInUser;
}

function getStarredEmails() {
    const starredEmails = gEmails.filter((email) => email.isStarred);
    return Promise.resolve(starredEmails);
}

function getEmailById(emailId) {
    const email = gEmails.find((email) => email.id === emailId);
    if (!email) return Promise.resolve(null);
    else return Promise.resolve(email);
}

function addEmail(email) {
    email.id = utilService.makeId();
    email.isRead = true;
    email.isStarred = false;
    if (!email.folder) email.folder = 'sent';
    email.sentAt = Date.now();
    email.removeAt = null;
    gEmails.push(email);
    _saveEmails();
    return Promise.resolve();
}

function updateEmail(email) {
    const id = email.id ? email.id : utilService.makeId();
    email.id = id;
    email.isRead = true;
    email.isStarred = false;
    if (!email.folder) email.folder = 'drafts';
    if (!email.sentAt) email.sentAt = null;
    email.removeAt = null;
    const idx = gEmails.findIndex((email) => email.id === id);
    if (idx >= 0) gEmails.splice(idx, 1, email);
    else gEmails.push(email);
    _saveEmails();
    return Promise.resolve(id);
}

function onUndelete(emailId) {
    const idx = gEmails.findIndex((email) => email.id === emailId);
    gEmails[idx].removeAt = null;
    gEmails[idx].folder = 'inbox';
    _saveEmails();
    return Promise.resolve();
}

function removeEmail(emailId) {
    const idx = gEmails.findIndex((email) => email.id === emailId);
    gEmails[idx].removeAt = Date.now();
    gEmails[idx].folder = 'deleted';
    _saveEmails();
    return Promise.resolve();
}

function purgeEmail(emailId) {
    const idx = gEmails.findIndex((email) => email.id === emailId);
    gEmails.splice(idx, 1);
    _saveEmails();
    return Promise.resolve();
}

function onToggleRead(emailId) {
    const idx = gEmails.findIndex((email) => email.id === emailId);
    gEmails[idx].isRead = !gEmails[idx].isRead;
    _saveEmails();
    return Promise.resolve();
}

function onToggleStarred(emailId) {
    const idx = gEmails.findIndex((email) => email.id === emailId);
    gEmails[idx].isStarred = !gEmails[idx].isStarred;
    _saveEmails();
    return Promise.resolve();
}

function _loadEmails() {
    gEmails = storageService.loadFromStorage('emailsDB');
    if (!gEmails) {
        gEmails = emails;
    }

    gEmails.forEach((email, idx) => {
        if (email.removeAt && email.removeAt + 1000 * 60 < Date.now()) gEmails.splice(idx, 1);
    });

    _saveEmails();
}

function _saveEmails() {
    storageService.saveToStorage('emailsDB', gEmails);
}
