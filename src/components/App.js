import React from 'react'
import Header from './Header';
import Inventory from './Inventory'
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    };
    componentDidMount(){
        const { params } = this.props.match;
            this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    addFish = fish => {
        //1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Add new fish to our fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes object to state
        this.setState({ fishes });
    }
    updateFish = (key, updatedFish) => {
        //1. Take a copy of the current state
        const fishes = { ...this.state.fishes };
        //2. Update fish
        fishes[key] = updatedFish;
        //3. Set state of current Fish
        this.setState({ fishes })
    }
    deleteFish = (key) => {
        //1. Take a copy of the fish
        const fishes = { ...this.state.fishes };
        //2. Update the state of Fishes
        fishes[key] = null;
        //3. Set state of current fishes
        this.setState({ fishes });
    }
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes})
    }
    AddToOrder = (key) => {
        //1. Take a copy of state
        const order = {...this.state.order };
        //2. Either add to order or update number in our order
        order[key] = order[key] + 1 || 1;
        //3. call setState to update our state
        this.setState({order});
    }
    removeOrder = key => {
        //1. Spread out state and create a copy
        const order = {...this.state.order };
        //2. Either remove order or update number in our order
        delete order[key];
        //3. set order state
        this.setState({order});
    }
 render() {
     return (
         <div className="catch-of-the-day">
         <div className="menu">
         <Header tagline="FRESH SEAFOOD MARKETPLACE"/>
         <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => 
            <Fish key = {key}
                index = {key}
                details={this.state.fishes[key]}
                AddToOrder={this.AddToOrder}
                removeOrder={this.removeOrder} />)}
         </ul>
         </div>
         <Order fishes={this.state.fishes} 
                order={this.state.order} 
                removeOrder={this.removeOrder}/>
         <Inventory 
            addFish={this.addFish}
            updateFish={this.updateFish}
            deleteFish={this.deleteFish}
            loadSampleFishes={this.loadSampleFishes}
            fishes={this.state.fishes}/>
         </div>
     )
 }
}
export default App;