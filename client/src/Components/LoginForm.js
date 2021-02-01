import React from "react";
import axios from "axios";
import './LoginForm/LoginForm.css';

export default class LoginForm extends React.Component {
  
state = {
    loginValue: "123",
    password: "12345",
    resLength: "0",
    firstName: "Aaron",
    lastName: "Lostovich",
    country: "noname ostrov",
    about: "",
    role: "",
    pin: "",
    userId: ""
}

constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.signInFunction = this.signInFunction.bind(this);
}

onInputChange(event){
    this.setState({
        [event.target.name]: event.target.value
    });
}

signInFunction = (e) =>{
    axios.post('http://localhost:9000/signInFunction', null, {
        params: {
            login: this.state.loginValue,
            password: this.state.password   
        }
    }).then((data) => {
        this.setState({resLength: data.data.length.toString()});
        console.log(this.state.loginValue, this.state.password, this.state.resLength);
        if (this.state.resLength == "0"){
            console.log("error");
            alert("неверный логин или пароль");
        }
        else {
            this.setState({
                firstName: data.data[0]._firstName,
                lastName: data.data[0]._lastName,
                country: data.data[0]._country,
                about: data.data[0]._about,
                role: data.data[0]._role,
                pin: data.data[0]._pin,
                userId: data.data[0]._id
            });
            this.props.signInHandler(this.state.loginValue, this.state.password, this.state.firstName, this.state.lastName, this.state.country, this.state.about, this.state.role, this.state.pin, this.state.userId);
            console.log(this.state.resLength);
        }
    });  
}

//sign up - регистрация, sign in - вход 
render() {
    return (
        <div className="loginForm-block">  
            <p className="loginForm-block_p">
                <label className="loginForm-block_label">
                    E-Mail
                </label>
                <input 
                    className="loginForm-block_input" 
                    value={this.state.loginValue} 
                    type="email" 
                    name="loginValue" 
                    onChange={this.onInputChange}/>
            </p>
            <p className="loginForm-block_p">
                <label className="loginForm-block_label">
                    Password
                </label>
                <input 
                    className="loginForm-block_input" 
                    type="password" 
                    value={this.state.password}
                    onChange={this.onInputChange}
                    name="password"/>
            </p>
            <div className="loginForm-block_buttonDiv">
                <p>
                    <button 
                        className="loginForm-block_button" 
                        onClick={this.signInFunction}>
                            Sign In
                    </button>
                </p> 
                <p>
                    <button 
                        className="loginForm-block_button" 
                        onClick={this.props.signUpHandler}>
                            Sign Up
                    </button>
                </p>
            </div>
        </div>
        );
    }
}