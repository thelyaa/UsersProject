import React from "react";
import axios from "axios";
import './RegisterForm/RegisterForm.css';

export default class RegisterForm extends React.Component {
  
state = {
    firstName: "Aaron",
    lastName: "Lostovich",
    country: "noname ostrov",
    email: "1234@gmail.com",
    password: "123",
    repeatPassword: "123",
    pin: "",
    userId: ""
}

constructor(props){
    super(props);
    this.registerNewUserFunction = this.registerNewUserFunction.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
}

onInputChange(event){
    this.setState({
        [event.target.name]: event.target.value
    });
}

registerNewUserFunction = (e) => {
    if (this.state.password !== this.state.repeatPassword) alert("пароли не совпадают");
    else if (this.state.firstName !== ""){
        axios.post('http://localhost:9000/registerNewUserFunction', null, {
            params: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                country: this.state.country,
                email: this.state.email,
                password: this.state.password,
                repeatPassword: this.state.repeatPassword
            }
        }).then((data) => {
            console.log(data.data)
            this.setState({pin: data.data._pin, userId: data.data._id})
            this.props.registerHandler(this.state.email, this.state.password, this.state.firstName, this.state.lastName, this.state.country, this.state.about, "No role", this.state.pin, this.state.userId);
        });
       
    }
    else alert("заполните пустые поля");
}

render() {
    return (
      <div>
        <h1>Registration</h1>
        <div className="registerForm-right">
            <p className="registerForm-right_p"><label>First Name</label><input 
                type="text"
                onChange={this.onInputChange}
                name="firstName"
                value={this.state.firstName}></input>
            </p>
            <p className="registerForm-right_p"><label>Last Name</label><input 
                type="text"
                name="lastName"
                onChange={this.onInputChange}
                value={this.state.lastName}></input>
            </p>
            <p className="registerForm-right_p"><label>Country</label><input 
                type="text"
                name="country"
                onChange={this.onInputChange}
                value={this.state.country}></input>
            </p>
            <p className="registerForm-right_p"><label>E-mail</label><input 
                type="email"
                name="email"
                onChange={this.onInputChange}
                value={this.state.email}></input>
            </p>
            <p className="registerForm-right_p"><label>Password</label><input 
                type="password"
                name="password"
                onChange={this.onInputChange}
                value={this.state.password}></input>
            </p>
            <p className="registerForm-right_p"><label>Repeat password</label><input 
                type="password"
                name="repeatPassword"
                onChange={this.onInputChange}
                value={this.state.repeatPassword}></input>
            </p>
        
            <div className="registerForm-right_buttonDiv">
                <button onClick={this.registerNewUserFunction}>ОК</button>
                <button onClick={this.props.cancelHandler}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}