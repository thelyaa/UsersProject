import React from "react";
import axios from "axios";
import './EventsForm/UpdateEventInfoForm.css'

export default class EventsForm extends React.Component {
  
state = {
    title: this.props.eventTitle
}

constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this)
}

onInputChange(event){
    this.setState({
        [event.target.name]: event.target.value
    });
}

updateEventTitleFunction = (e) => {
    axios.post('http://localhost:9000/updateEventTitleFunction', null, {
        params: {
            eventId: this.props.eventId,
            eventTitle: this.state.title
        }
    }).then((data) => {
        this.props.updateEventTitleHandler(this.state.title)
    })
}

render() {
    return (
        <div className="updateEventInfo-block">
            <label>Event Title: </label><input 
                type="text"
                value={this.state.title}
                name="title"
                onChange={this.onInputChange}/>
            <div className="updateEventInfo-block_buttonDiv">
                <button onClick={this.updateEventTitleFunction}>OK</button>
                <button onClick={this.props.cancelHandler}>Cancel</button>
            </div>
        </div>
        )
    }
}