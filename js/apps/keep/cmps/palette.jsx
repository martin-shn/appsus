export class Palette extends React.Component{

    state={
        colors:['#f94144','#FFADAD','#FFD6A5','#FDFFB6','#CAFFBF','#9BF6FF','#A0C4FF','#BDB2FF','#FFC6FF','#FFFFFC'],
    }

    onPaletteColor=({target})=>{
        this.props.onPaletteColor(target.id);
    }

    render(){
        return <div className="palette" onMouseLeave={()=>this.props.onMouseLeave()}>
            {this.state.colors.map((color,idx) => {
                return <div key={idx} id={color} onClick={this.onPaletteColor} style={{backgroundColor:color}}></div>
            })}
        </div>
    }
}

