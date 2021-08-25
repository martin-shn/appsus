import { Ratings2 } from './ratings.jsx'


export class AddReview extends React.Component {

    state = {
        userName:'Books Reader',
        review:'',
        date: new Date(),
        stars:1
    }

    ratings = () => {
        return (<div className="rating">
            <input name="5" id="e5" type="radio" onChange={this.saveStars} /><label htmlFor="e5"></label>
            <input name="4" id="e4" type="radio" onChange={this.saveStars} /><label htmlFor="e4"></label>
            <input name="3" id="e3" type="radio" onChange={this.saveStars} /><label htmlFor="e3"></label>
            <input name="2" id="e2" type="radio" onChange={this.saveStars} /><label htmlFor="e2"></label>
            <input name="1" id="e1" type="radio" onChange={this.saveStars} /><label htmlFor="e1"></label>
            {/* ☆ */}
        </div>)
    }

    saveStars = (ev) => {
        this.setState({ ratings: +ev.target.name })
    }

    // onSaveReview = 

    render() {
        return (
            <div className="review-add">
                {this.ratings()}
                <form>
                    <input type="text" placeholder="Your name" value={this.state.userName}/>
                    <input className="review-date" type="date" value={`${this.state.date.getFullYear()}-${this.state.date.getMonth()+1}-${this.state.date.getDate()}`} />
                    <textarea rows="5" placeholder="Write your review here" value={this.state.review}/>
                    <button>Add</button>

                </form>
            </div>
        )
    }
}