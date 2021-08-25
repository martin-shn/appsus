import { BOOKS } from '../data/books.js';
import { storageService } from '../../../services/storage.service.js';
import { googleService } from './googleBooks-service.js';

export const booksService = {
    query,
    getBookById,
    addReview,
    removeReview,
    addGoogleBook,
    gotoBook,
};
let gBooks;
_loadBooks();

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
    } else return Promise.resolve(gBooks);
}

function getBookById(bookId) {
    const book = gBooks.find((book) => book.id === bookId);
    if (!book) return Promise.resolve(null);
    else return Promise.resolve(book);
}

function addGoogleBook(googleBook) {
    return getBookById(googleBook.id).then((book) => {
        if (book) return Promise.reject('Book already exist');
        else {
            gBooks.unshift(googleService.rebuildGoogleBook(googleBook));
            _saveBooks();
            return Promise.resolve();
        }
    });
}

function gotoBook(bookId,step){
    const bookIdx=gBooks.findIndex(book=>book.id===bookId);
    if (bookIdx+step>=gBooks.length) return Promise.resolve(gBooks[0].id);
    if (bookIdx+step<0) return Promise.resolve(gBooks[gBooks.length-1].id);
    return Promise.resolve(gBooks[bookIdx+step].id);
}


function addReview(bookId, review) {
    const bookIdx = gBooks.findIndex((book) => book.id === bookId);
    if (!gBooks[bookIdx].reviews) gBooks[bookIdx].reviews = [];
    gBooks[bookIdx].reviews.unshift(review);
    _saveBooks();
    return Promise.resolve();
}

function removeReview(bookId, reviewIdx) {
    const bookIdx = gBooks.findIndex((book) => book.id === bookId);
    gBooks[bookIdx].reviews.splice(reviewIdx, 1);
    _saveBooks();
    return Promise.resolve();
}

function _loadBooks() {
    gBooks = storageService.loadFromStorage('missBooksDB');
    if (!gBooks) {
        gBooks = BOOKS;
        _saveBooks();
    }
}

function _saveBooks() {
    storageService.saveToStorage('missBooksDB', gBooks);
}
