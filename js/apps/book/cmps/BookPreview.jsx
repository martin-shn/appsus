const { Link } = ReactRouterDOM

export function BookPreview({book}) {
    return (
        <Link to={`/book/${book.id}`}>
            <div className='book-preview'>
                <label>{book.title}</label>
                {book.listPrice.amount>0&&<label className='price'>
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
