import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

/*
//Function based component!
const App = () => {
    //This function requires two function callbacks to determine the current location.
    window.navigator.geolocation.getCurrentPosition(
        (position) => console.log(position), //success callback
        (err) => console.log(err) //faliure callback
    );
    return (
        <div>Latitude:</div>
    );
};
*/


//  Based Component!
//It allows tons of functionality from React.Component
class App extends React.Component {

    //Constructor initialization
    //Very first function to be called any time the instance of the class is created:
    // constructor(props){
    //     super(props);

    //     //Initializing the state object
    //     //THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO this.state I.E., FIRST TIME WHILE INITIALIZING!
    //     this.state={lat: null, errorMessage: ''}; //Since we don't know the lattitude yet, hence, default to null.

    //     /*//This function requires two function callbacks to determine the current location.
    //     window.navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             this.setState({ lat: position.coords.latitude }); //update the state using setState!!!!
    //             //DO NOT - this.state.lat : position.coords.latitude ! WRONG!!!
    //         }, //success callback
    //         (err) => {
    //             this.setState({errorMessage:err.message });
    //         } //faliure callback
    //     );*/
    // }

    //Another way to initialize state apart from constructor initialization
    state = {lat: null, errorMessage: ''};

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }), 
            (err) => this.setState({errorMessage:err.message })
        );
    }

    componentDidUpdate(){
        console.log('My component was just updated - it rerendered!');
    }
    
    
    //React says we have to define render()!!
    render() {
        /* Since render() is called very frequently, we shifted this inside constructor()
        //This function requires two function callbacks to determine the current location.
        window.navigator.geolocation.getCurrentPosition(
            (position) => console.log(position), //success callback
            (err) => console.log(err) //faliure callback
        );*/
        
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error : {this.state.errorMessage}</div>;
        }

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />;
        }

        return <Spinner message = "Please accept location request"/>;
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);