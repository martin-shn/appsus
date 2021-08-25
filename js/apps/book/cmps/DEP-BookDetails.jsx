import { booksService } from '../services/books.service.js';
import { getSymbol } from './BookPreview.jsx';
import { LongTxt } from './LongTxt.jsx';

export function BookDetails({ book, onUnSelectBook }) {
    getFullLang('en');

    return (
        <section className={`book-details ${book.listPrice.isOnSale && 'sale'}`}>
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <div>
                {book.listPrice.isOnSale ? (
                    <div className='sale'>
                        <i className='left'></i>
                        <i className='right'></i>
                        {book.listPrice.isOnSale ? 'ON\nSALE' : ''}
                    </div>
                ) : (
                    ''
                )}
                <img src={book.thumbnail} />
            </div>
            {/* if (!book.listPrice.isOnSale) document.querySelector('.sale').hidden=true; */}
            <h3>Authors: {book.authors.map((author) => author).join(', ')}</h3>
            <h4 className='lang'>
                Book language: <span>{getFullLang(book.language)}</span>
            </h4>
            <h4 className='categories'>
                Book categories:
                <br /> <span>{book.categories.map((category) => category).join(', ')}</span>
            </h4>
            <label className={`price span ${(book.listPrice.amount > 150 && 'red') || (book.listPrice.amount < 20 && 'green')}`}>
                Price:{' '}
                <span className='price'>
                    {book.listPrice.amount} {getSymbol(book.listPrice.currencyCode)}
                </span>
            </label>
            <h4 className='pages'>
                Pages: <span>{pageReading(book.pageCount)}</span>
            </h4>
            <h4 className='published'>
                First published at:{' '}
                <span>
                    {book.publishedDate} {publishedDate(book.publishedDate)}
                </span>
            </h4>
            <LongTxt text={book.description} />
            <button onClick={onGotoBook(book.id, -1)}>Previous book</button>
            <button onClick={onUnSelectBook}>Back</button>
            <button onClick={onGotoBook(book.id, 1)}>Next book</button>
        </section>
    );
}

function onGotoBook(bookId, step) {
    booksService.gotoBook(bookId, step).then((bookId) => {
        this.props.history.push(`/book/${bookId}`);
    });
}

function pageReading(pages) {
    if (pages < 100) return '- Light Reading';
    if (pages > 500) return '- Long Reading';
    if (pages > 200) return '- Desent Reading';
}

function publishedDate(year) {
    const currYear = new Date().getFullYear;
    if (currYear - year > 10) return '- Veteran Book';
    if (currYear - year < 1) return '- New';
}

function getFullLang(langCode) {
    const langs = new Intl.DisplayNames(['en'], { type: 'language' });
    return langs.of(langCode);
}
