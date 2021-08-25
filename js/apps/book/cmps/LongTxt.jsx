export class LongTxt extends React.Component {
    state = {
        isLongTxtShown: false,
    };

    getTextToShow = (text) => {
        const { isLongTxtShown } = this.state
        if (isLongTxtShown) return text;
        return text.substring(0, 100);
    }

    onToggleText = (text) => {
        this.setState((prevState) => ({ isLongTxtShown: !prevState.isLongTxtShown }))
    }

    render() {
        const { isLongTxtShown } = this.state
        const { text } = this.props

        return <p>
             Desc: {this.getTextToShow(text)}
            {text.length > 100 && <a onClick={() => this.onToggleText()}>
                {isLongTxtShown ? 'Read Less' : 'Read More'}</a>}
        </p>
    }
}

