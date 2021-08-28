import { booksService } from '../services/books.service.js';
import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { BookDetails } from '../cmps/BookDetails.jsx';
import { AddBook } from '../cmps/AddBook.jsx';

export class MissBooks extends React.Component {
    state = {
        books: [],
        filter: null,
        currBook: null,
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => booksService.query(this.state.filter).then((res) => this.setState({ books: res }));

    onSetFilter = (filterBy) => {
        this.setState({ filter: filterBy }, this.loadBooks);
    };

    onSelectBook = (book) => {
        this.setState({ currBook: book });
    };

    onUnSelectBook = () => {
        this.setState({ currBook: null });
    };

    render() {
        return (
            <React.Fragment>
                {!this.state.currBook && (
                    <React.Fragment>
                        <div className="sides-header-background">
                            <div className="books-header">
                                <AddBook dueFunc={this.loadBooks} />
                            </div>
                        </div>
                        <BookFilter onSetFilter={this.onSetFilter} />
                        <BookList onSelectBook={this.onSelectBook} books={this.state.books} />
                    </React.Fragment>
                )}
                {this.state.currBook && <BookDetails book={this.state.currBook} onUnSelectBook={this.onUnSelectBook} />}
            </React.Fragment>
        );
    }
}
