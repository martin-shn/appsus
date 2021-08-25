import { getSymbol } from './BookPreview.jsx';
import { LongTxt } from './LongTxt.jsx';
import { ShowReviews } from './ShowReviews.jsx';
import { ReviewAdd } from './ReviewAdd.jsx';
import { booksService } from '../services/books.service.js';
const { Route } = ReactRouterDOM;

export class BookDetails extends React.Component {
    state = {
        book: null,
    };

    componentDidMount(prevProps) {
        this.loadBook();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook();
        }
    }

    loadBook = () => {
        const id = this.props.match.params.bookId;
        booksService.getBookById(id).then((book) => {
            if (!book) this.props.history.push('/book');
            this.setState({ book });
        });
    };

    pageReading = (pages) => {
        if (pages < 100) return '- Light Reading';
        if (pages > 500) return '- Long Reading';
        if (pages > 200) return '- Desent Reading';
    };

    publishedDate = (year) => {
        const currYear = new Date().getFullYear;
        if (currYear - year > 10) return '- Veteran Book';
        if (currYear - year < 1) return '- New';
    };

    getFullLang = (langCode) => {
        const langs = new Intl.DisplayNames(['en'], { type: 'language' });
        return langs.of(langCode);
    };

    getPriceClass = (price) => {
        if (price > 150) return 'red';
        if (price < 20) return 'green';
        return '';
    };

    onGoBack = () => {
        this.props.history.push('/book');
    };

    onGotoBook = (bookId, step) => {
        booksService.gotoBook(bookId, step).then((bookId) => {
            this.props.history.push(`/book/${bookId}`);
        });
    };

    render() {
        const { book } = this.state;
        if (!book) return <div>Loading...</div>;
        return (
            <section className={`book-details ${book.listPrice.isOnSale && 'sale'}`}>
                {book.title && <h1>{book.title}</h1>}
                {book.subtitle && <h2>{book.subtitle}</h2>}
                {book.thumbnail && (
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
                )}
                {book.authors && (
                    <h3>
                        <label>Authors:</label> {book.authors.map((author) => author).join(', ')}
                    </h3>
                )}
                {book.language && (
                    <h4 className='lang'>
                        Book language: <span>{this.getFullLang(book.language)}</span>
                    </h4>
                )}
                {book.categories && (
                    <h4 className='categories'>
                        Book categories:
                        <br /> <span>{book.categories.map((category) => category).join(', ')}</span>
                    </h4>
                )}
                {book.listPrice.amount > 0 && (
                    <label className={`price ${this.getPriceClass(book.listPrice.amount)}`}>
                        Price:{' '}
                        <span>
                            {book.listPrice.amount} {getSymbol(book.listPrice.currencyCode)}
                        </span>
                    </label>
                )}
                {book.pageCount && (
                    <h4 className='pages'>
                        Pages:{' '}
                        <span>
                            {book.pageCount} {this.pageReading(book.pageCount)}
                        </span>
                    </h4>
                )}
                {book.publishedDate && (
                    <h4 className='published'>
                        First published at:{' '}
                        <span>
                            {book.publishedDate} {this.publishedDate(book.publishedDate)}
                        </span>
                    </h4>
                )}
                {book.description && <LongTxt text={book.description} />}
                <section className='reviews'>
                    <button onClick={() => this.props.history.push(`/book/${book.id}/add-review`)}>Add a review</button>
                    <Route exact path='/book/:bookId/add-review' component={ReviewAdd} />
                    <Route exact path='/book/:bookId' component={ShowReviews} />
                </section>
                <button className='prev' onClick={() => this.onGotoBook(book.id, -1)}>
                    Previous book
                </button>
                <button className='back' onClick={this.onGoBack}>
                    Back
                </button>
                <button className='next' onClick={() => this.onGotoBook(book.id, 1)}>
                    Next book
                </button>
            </section>
        );
    }
}
