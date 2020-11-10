import React from 'react'
import AddFishForm from './AddFishForm';
import EditFishForm from "./EditFishForm";
import Login from './Login';
import firebase from 'firebase';
import base,{ firebaseApp } from '../base';

class Inventory extends React.Component{
    state = {
        uid: null,
        owner: null
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            }
        })
    }
    authHandler = async authData => {
        //1. Look up the current stire in database
        const store = await base.fetch(this.props.storeId, { context: this })
        //2. Claim the store
        if(!store.owner){
            //save it as ours
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        //3.Set the store as ours    
            this.setState({
                uid: authData.user.uid,
                owner: store.owner || authData.user.uid
            })
    }
    authenticate = provider => {
        const authProvider =new firebase.auth[ `${provider}AuthProvider`]();
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    }
    
    logout = async() => {
        console.log('Logging out');
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }
    render() {
        const logout = <button className="logout" onClick={this.logout}> Log out!</button>;
        //1. check login status
        if (!this.state.uid){
            return <Login authenticate={this.authenticate} />;
        }
        //2. Check if uid owns store or not
        if (this.state.uid !== this.state.owner ){
            return (
                <div>
                    <p> You are not the owner!</p>
                    {logout} 
                </div>
            )
        }
        
        return (
            
            <div className="Inventory">
            <h2>Inventory</h2>
            {logout}
            {Object.keys(this.props.fishes).map(key => (
            <EditFishForm 
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish} />
            ))}
            <AddFishForm addFish={this.props.addFish}/>
            <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}
export default Inventory;