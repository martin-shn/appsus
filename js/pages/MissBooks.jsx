import { booksService } from '../apps/book/services/books.service.js';
import { BookFilter } from '../apps/book/cmps/BookFilter.jsx';
import { BookList } from '../apps/book/cmps/BookList.jsx';
import { BookDetails } from '../apps/book/cmps/BookDetails.jsx';
import { AddBook } from '../apps/book/cmps/AddBook.jsx';

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
                        <BookFilter onSetFilter={this.onSetFilter} />
                        <AddBook dueFunc={this.loadBooks}/>
                        <BookList onSelectBook={this.onSelectBook} books={this.state.books} />
                    </React.Fragment>
                )}
                {this.state.currBook && <BookDetails book={this.state.currBook} onUnSelectBook={this.onUnSelectBook} />}
            </React.Fragment>
        );
    }
}
