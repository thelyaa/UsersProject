import React from "react";
import axios from "axios";
import './EventsForm/EventsForm.css'

export default class EventsForm extends React.Component {
  
constructor(props){
    super(props);
}

render() {
    return (
        <div className="eventsInfo">
            {console.log(this.props.eventId)}
            <div className="eventsInfo-block">
                <div className="eventsInfo-block_panel">
                    Events information
                    <button onClick={this.props.updateEventInfoHandler}></button>
                </div>
                <p>Event title:<input 
                    type="text"
                    value={this.props.eventTitle}/>
                </p>
            </div>
            <div className="eventsInfo-block">
                <div className="eventsInfo-block_panel">
                    Dates information
                    <button></button>
                </div>
                <p>Start Date: <input 
                    type="text" 
                    value={this.props.startDate}/>
                </p>
                <p>C1 Date: <input 
                    type="text" 
                    value={this.props.c1Date}/>
                </p>
                <p>C+1 Date: <input 
                    type="text" 
                    value={this.props.cPlus1Date}/>
                </p>
                <p>Finish Date: <input 
                    type="text" 
                    value={this.props.finishDate}/>
                </p>
            </div>
            <div className="eventsInfo-block">
                <div className="eventsInfo-block_panel">
                    Participants
                <button></button>
                </div>
                <p>Participants: <input type="text"/> <button className="eventsInfo-block_participants">Assign</button></p>
            </div>
            <div className="eventsInfo-block_buttonDiv">
                <button>OK</button>
                <button>Cancel</button>
            </div>
        </div>
        )
    }
}