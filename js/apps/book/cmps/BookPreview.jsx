const { Link } = ReactRouterDOM

export function BookPreview({book}) {
    return (
        <Link className="clear-link" to={`/book/${book.id}`}>
            <div className='book-preview'>
                <label className="clear-link">{book.title}</label>
                {book.listPrice.amount>0&&<label className='price clear-link'>
                    {book.listPrice.amount} {getSymbol(book.listPrice.currencyCode)}
                </label>}
                <img src={book.thumbnail} />
            </div>
        </Link>
    );
}

export function getSymbol(currency) {
    let symbol;
    switch (currency) {
        case 'USD':
            return '$';
        case 'ILS':
            return '₪';
        case 'EUR':
            return '€';
        default:
            return currency;
    }
}
