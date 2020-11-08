import React from 'react'


class editFishForm extends React.Component {
    handleChange = (event) => {
        //console.log(event.currentTarget.name)
        //Update that fish
        //1. Take a copy of current fish
        const updatedFish =  {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        }
        this.props.updateFish(this.props.index, updatedFish)
    }   
    render(){
    return (
        <div className="fish-edit">
            <input 
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.props.fish.name}/>
            <input 
            type="text"
            name="price"
            onChange={this.handleChange}
            value={this.props.fish.price}/>
            <select 
            type="text"
            onChange={this.handleChange}
            name="status"
            value={this.props.fish.status}>
                <option value="available">Fresh</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea
            name="desc"
            onChange={this.handleChange}
            value={this.props.fish.desc}/>
            <input
            type="text"
            name="image"
            onChange={this.handleChange}
            value={this.props.fish.image}/>
            <button onClick={() => this.props.deleteFish(this.props.index)}> 
            Remove Fish</button>
        </div>
    )
    }
}

export default editFishForm;
