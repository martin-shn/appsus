import { booksService } from '../services/books.service.js';
import { googleService } from '../services/googleBooks-service.js';
import { eventBusService } from '../../../services/event-bus-service.js';
const { Link } = ReactRouterDOM;

export class AddBook extends React.Component {
    state = {
        query: '',
        data: null,
    };

    handleChange = ({ target }) => {
        this.setState({ query: target.value });
    };

    OnSearch = (ev) => {
        ev.preventDefault();
        const query = this.state.query;
        console.log(query);
        googleService.getBooks(query).then((res) => {
            this.setState({ data: res });
        });
    };

    onAddBook = (book) => {
        // const link = <Link to='/'>test</Link>
        booksService
            .addGoogleBook(book)
            .then(() => {
                eventBusService.emit('user-msg', {
                    txt: `A new book is added: ${book.volumeInfo.title}`,
                    id: `book/${book.id}`,
                    link: 'Check it out - click here',
                    type: 'success',
                });

                this.props.dueFunc();
            })
            .catch((err) => eventBusService.emit('user-msg', { txt: err, type: 'error', timer: 3000 }));
    };

    onToggle = () => {
        this.setState({ data: null });
    };

    render() {
        return (
            <section className='google-search'>
                <form className="add-book" onSubmit={this.OnSearch}>
                    {/* <label htmlFor='search'>Search:</label> */}
                    <input className='search-input' type='search' placeholder="Search book" id='search' value={this.state.query} onChange={this.handleChange} />
                    <button>Search</button>
                </form>
                {this.state.data && (
                    <div className='search-results'>
                        <button onClick={this.onToggle}>X</button>
                        {this.state.data.map((book) => {
                            return (
                                <React.Fragment key={book.id}>
                                    <p key={book.id}>
                                        {book.volumeInfo.title}
                                        <button onClick={() => this.onAddBook(book)}>+</button>
                                    </p>
                                    <hr />
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}
            </section>
        );
    }
}
