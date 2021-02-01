import React from "react";
import axios from "axios";
import "./EventsForm/EventsListForm.css"

export default class EventsListForm extends React.Component {

constructor(props){
    super(props);
    this.getEventInfoFunction = this.getEventInfoFunction.bind(this);
}    
 
eventInfo = []
getEventInfoFunction(id){
    axios.post('http://localhost:9000/getEventInfo', null, {
        params: {
            id: id
        }
    }).then((data) => {
        console.log(data.data)
        var dateStart = data.data._startDate.split('T')
        var newDateFormatArr = dateStart[0].split('-')
        var newDateFormat = newDateFormatArr[2]+'/'+newDateFormatArr[1]+'/'+newDateFormatArr[0]
        var dateFinish = data.data._finishDate.split('T')
        var newDateFormatArr1 = dateFinish[0].split('-')
        var newDateFormat1 = newDateFormatArr1[2]+'/'+newDateFormatArr1[1]+'/'+newDateFormatArr1[0]
        var dateC1 = data.data._c1Date.split('T')
        var newDateFormatArr2 = dateC1[0].split('-')
        var newDateFormat2 = newDateFormatArr2[2]+'/'+newDateFormatArr2[1]+'/'+newDateFormatArr2[0]
        var dateCPlus1 = data.data._cPlus1Date.split('T')
        var newDateFormatArr3 = dateCPlus1[0].split('-')
        var newDateFormat3 = newDateFormatArr3[2]+'/'+newDateFormatArr3[1]+'/'+newDateFormatArr3[0]
        this.eventInfo.push({eventId: data.data._id, c1Date: newDateFormat2, cPlus1Date: newDateFormat3, startDate: newDateFormat, finishDate: newDateFormat1, participants: data.data._participants, title: data.data._eventTitle})
        
        axios.post('http://localhost:9000/getUserEvents', null, {
            params: {
                userId: this.props.userId,
                eventId: data.data._id
            }
        }).then((result) => {
            var isPart = false
            console.log(result.data)
            if (result.data !== ""){
                isPart = true
                this.props.goToEventInfo(this.eventInfo, isPart)
            }
            this.props.goToEventInfo(this.eventInfo, isPart)
        })
        
    })
}
    
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
                        <tr onClick={() => {this.getEventInfoFunction(item.eventId)}}>
                            <td>{item.eventTitle}</td>
                            <td>{item.eventStartDate} — {item.finishDate}</td>
                            <td>{item.participants}</td>
                        </tr>
                    )
                })}
            </table>
            {this.props.role === "admin" ? (
                <div className="eventsListForm-table_buttonDiv">
                    <button onClick={this.props.addEventHandler}>Add Event</button>
                </div>
            ):""}
            <div className="eventsListForm-table_buttonDiv">
                <button onClick={this.props.cancelHandler}>OK</button>
            </div>
        </div>         
        );
    }
}