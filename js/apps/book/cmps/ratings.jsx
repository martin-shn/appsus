export function Ratings(){
    return (<div className="rating rating2">
		<a href="#" title="Give 5 stars"></a>
		<a href="#" title="Give 4 stars"></a>
		<a href="#" title="Give 3 stars"></a>
		<a href="#" title="Give 2 stars"></a>
		<a href="#" title="Give 1 star"></a>
		{/* <a href="#1" title="Give 1 star">★</a> */}
	</div>)

}

export function Ratings2(){
    return (<div class="rating">
        <input name="stars" id="e5" type="radio"/><label for="e5"></label>
		<input name="stars" id="e4" type="radio"/><label for="e4"></label>
		<input name="stars" id="e3" type="radio"/><label for="e3"></label>
		<input name="stars" id="e2" type="radio"/><label for="e2"></label>
		<input name="stars" id="e1" type="radio"/><label for="e1"></label>
		{/* <input name="stars" id="e1" type="radio"/><label for="e1">☆</label> */}
	</div>)
}
