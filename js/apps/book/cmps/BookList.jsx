import {BookPreview} from './BookPreview.jsx'

export function BookList({onSelectBook,books}) {
    return (
        <div className='book-list'>
            {books.map(book => <BookPreview key={book.id} onSelectBook={onSelectBook} book={book} />)}
        </div>
    );
}
