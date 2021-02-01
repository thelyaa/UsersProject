import React from "react";
import axios from "axios";
import './UserinfoForm/UserinfoForm.css';

export default class UserinfoForm extends React.Component {

constructor(props){
    super(props);
    this.state = {
        pin: this.props.pin
    };
}

resetPINFunction = (e) => {
    axios.post('http://localhost:9000/resetPin', null, {
        params: {
            userId: this.props.userId
        }
    }).then((data) => {
        this.setState({pin: ""})
    })
} 

render() {
    return (
        <div>
            {this.state.role}
            <div className="userinfoForm-right">
                <div className="userinfoForm-right_block">
                    <div className="userinfoForm-right_updatePanel">Login information
                        <button 
                            className="userinfoForm-right_update" 
                            onClick={this.props.updateLoginHandler}></button></div>
                    <p className="userinfoForm-right_p">Email:
                    <input 
                        type="text" 
                        value={this.props.currentLogin}/></p>
                    <p className="userinfoForm-right_p">Password:
                    <input 
                        type="password" 
                        value={this.props.password}/></p>
                </div>
                <div>
                    <div className="userinfoForm-right_block">
                        <div className="userinfoForm-right_updatePanel">Profile information
                        <button onClick={this.props.updateProfileHandler}></button></div>
                        <p className="userinfoForm-right_p">First Name:
                        <input
                            type="text"
                            value={this.props.firstName}/></p>
                        <p className="userinfoForm-right_p">Last Name:
                        <input
                            type="text"
                            value={this.props.lastName}/></p>
                        <p className="userinfoForm-right_p">Country:
                        <input
                            type="text"
                            value={this.props.country}/></p>
                        <p className="userinfoForm-right_p">About:
                        <input
                            type="text"
                            value={this.props.about}/></p>
                    </div>
                </div>
                <div>
                    <div className="userinfoForm-right_block">
                        <div className="userinfoForm-right_updatePanel">Personal Identification Number</div>
                        <p className="userinfoForm-right_p">PIN:
                            {this.props.pin !== "" ? (
                                <input 
                                    type="password" 
                                    value={this.state.pin}/>                               
                            ):""}
                        <div className="userinfoForm-right-block_setPIN">
                            
                            {this.state.pin !== "" ? (
                                <button onClick={this.resetPINFunction}>Reset PIN</button>
                            ):""}
                            {this.state.pin === "" ? (
                                <button 
                                    className="userinfoForm-right_setPIN" 
                                    onClick={this.props.setPINHandler}>Set PIN</button>
                            ):""}
                        </div></p>
                    </div>
                </div>
                <div className="userinfoForm-right-buttonDiv">
                    <button onClick={this.props.homePageHandler}>ОК</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
        );
    }
}