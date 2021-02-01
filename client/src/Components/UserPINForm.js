import React from "react";
import axios from "axios";

export default class UserPINForm extends React.Component {
  
state = {
    pin: ""
}

constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.savePINFunction = this.savePINFunction.bind(this);
}

onInputChange(event){
    this.setState({
        [event.target.name]: event.target.value
    });
}

savePINFunction = (e) => {
    axios.post('http://localhost:9000/savePIN', null, {
        params: {
            userId: this.props.userId,
            pin: this.state.pin
        }
    }).then((data) => {
        this.props.savePINHandler(this.state.pin)
    })
}

render() {
    return (
        <div className="updateEventInfo-block">
            <label>Enter PIN</label><input 
                type="text"
                onChange={this.onInputChange}
                name="pin"></input>
            <div className="updateEventInfo-block_buttonDiv">
                <button onClick={this.savePINFunction}>ОК</button>
                <button onClick={this.props.cancelHandler}>Cancel</button>
            </div>
        </div>
        );
    }
}