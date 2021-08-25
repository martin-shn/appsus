export class BookFilter extends React.Component {
    state = {
        filterBy: {
            filterName: '',
            minPrice: 0,
            maxPrice: '',
        },
        isShowFilter: false
    };

    handleChange = (ev) => {
        const filter = ev.target.name;
        this.setState({ filterBy: { ...this.state.filterBy, [filter]: ev.target.value } },
            () => {
                this.props.onSetFilter(this.state.filterBy);
            });
    };

    onFilter = (ev) => {
        ev.preventDefault();
        this.setState({ filterBy: { filterName: this.state.filterBy.filterName, minPrice: this.minPrice, maxPrice: this.maxPrice } },
            () => {
                this.props.onSetFilter(this.state.filterBy);
            });
    };

    onToggleFilter = () => {
        const { isShowFilter } = this.state
        this.setState({ isShowFilter: !isShowFilter })
    }

    minPrice = 0;
    maxPrice = Infinity;

    render() {
        return (
            <React.Fragment>
                <button onClick={this.onToggleFilter}>Add Filter</button>
                {this.state.isShowFilter &&

                    <form className="filter-form" onSubmit={this.onFilter}>
                        <label htmlFor='filterName'>Title: </label>
                        <input id='filterName' name='filterName' type='search' placeholder="Book Title" value={this.state.filterName} onChange={this.handleChange} />
                        <label htmlFor='minPrice'>Min price: </label>
                        <input id='minPrice' name='minPrice' type='number' placeholder="Min Price" value={this.state.minPrice} onChange={(ev) => (this.minPrice = ev.target.value)} />
                        <label htmlFor='maxPrice'>Max price: </label>
                        <input id='maxPrice' name='maxPrice' type='number' placeholder="Max Price" value={this.state.maxPrice} onChange={(ev) => (this.maxPrice = ev.target.value)} />
                        <button>Filter</button>
                    </form>
                }
            </React.Fragment>);
    }
}
