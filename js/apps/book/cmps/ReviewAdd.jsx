import { Ratings2 } from './ratings.jsx'
import { booksService } from '../services/books.service.js'

export class ReviewAdd extends React.Component {

    state = {
        userName:'Books Reader',
        review:'',
        date: new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,0)+'-'+String(new Date().getDate()).padStart(2,0),
        stars:1,
        reviews:null,
    }
    componentDidMount() {
        const id = this.props.match.params.bookId
        booksService.getBookById(id)
            .then(book => {
                console.log(book);
                if (!book) this.props.history.push('/book')
                this.setState({book})
            })
        this.nameField.current.focus()
    }
    
    nameField=React.createRef()
    starField=React.createRef()

    ratings = () => {
        return (<div className="rating">
            <input name="5" ref={this.starField} id="e5" type="radio" onChange={this.saveStars} /><label htmlFor="e5"></label>
            <input name="4" id="e4" type="radio" onChange={this.saveStars} /><label htmlFor="e4"></label>
            <input name="3" id="e3" type="radio" onChange={this.saveStars} /><label htmlFor="e3"></label>
            <input name="2" id="e2" type="radio" onChange={this.saveStars} /><label htmlFor="e2"></label>
            <input name="1" id="e1" type="radio" onChange={this.saveStars} /><label htmlFor="e1"></label>
            {/* ☆ */}
        </div>)
    }

    saveStars = (ev) => {
        console.log(ev.target.name);
        this.setState({ stars: +ev.target.name })
    }

    handleChange = (ev) => {
        this.starField.current.checked=true
        
        const field = ev.target.name;
        console.log('ev.target.name, ev.target.value:',ev.target.name, ev.target.value);
        this.setState({ [field]: ev.target.value },()=>console.log(this.state) );
    };
    
    onSaveReview = (ev)=>{
        ev.preventDefault()
        const reviewToSave={userName:this.state.userName,review:this.state.review,date:this.state.date, stars:this.state.stars};
        const id = this.props.match.params.bookId
        booksService.addReview(id,reviewToSave).then(()=>this.props.history.push(`/book/${id}`));
        
    }

    render() {
        // const currDate=this.state.date;
        return (
            <div className="review-add">
                {this.ratings()}
                <form onSubmit={this.onSaveReview}>
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="userName" ref={this.nameField} type="text" placeholder="Your name" value={this.state.userName} onChange={this.handleChange}/>
                    <label htmlFor="date">When did you read this book?</label>
                    <input id="date" name="date" className="review-date" type="date" value={this.state.date} onChange={this.handleChange} />
                    <textarea rows="5" name="review" placeholder="Write your review here" value={this.state.review} onChange={this.handleChange}/>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}
