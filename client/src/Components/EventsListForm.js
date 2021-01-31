import React from "react";
import axios from "axios";
import "./EventsForm/EventsListForm.css"

export default class EventsListForm extends React.Component {

constructor(props){
    super(props);
}
 
//goToEventInfoFunction = (e) => {
//    axios.post('http://localhost:9000/get')
//}    
    
render() {
    return (
        <div className="eventsListForm-table">
            {console.log(this.props.eventsList[0])}
            <table>
                <tr>
                    <th>Event</th>
                    <th>Dates</th>
                    <th>Participants</th>
                 </tr>
                {this.props.eventsList[0].map((item) => {
                    return(
                        <tr>
                            <td>{item.eventTitle}</td>
                            <td>{item.eventStartDate} — {item.finishDate}</td>
                            <td>{item.participants}</td>
                        </tr>
                    )
                })}
            </table>
            <div className="eventsListForm-table_buttonDiv">
                <button onClick={this.props.addEventHandler}>Add Event</button>
            </div>
        </div>         
        );
    }
}