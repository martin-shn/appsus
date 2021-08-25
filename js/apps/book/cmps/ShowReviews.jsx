const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { booksService } from "../services/books.service.js";

export class ShowReviews extends React.Component {
    state = {
        book: null
    }

    componentDidMount() {
        const bookId = this.props.match.params.bookId;
        booksService.getBookById(bookId).then((book) => this.setState({ book }));
    }

    render() {
        if (!this.state.book) return <h1>Loading...</h1>
        return (
            <section>

                {this.state.book.reviews && this.state.book.reviews.map((review,idx) => {
                    return <div key={idx}>
                        <header>{review.userName}, {new Date(review.date).toLocaleDateString('en-GB')} 
                        <span>{'★'.repeat(review.stars)}</span><button title="Delete this review" onClick={() => booksService.removeReview(this.state.book.id,idx).then(()=>this.props.history.push(`/book/${this.state.book.id}`))}>X</button></header>
                        <p>{review.review}</p>
                        <hr/>
                    </div>                    
                })}
            </section>
        )
    }
}
