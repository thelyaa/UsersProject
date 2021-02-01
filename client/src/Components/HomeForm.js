import React from "react";
import './HomeForm/HomeForm.css';
import axios from "axios"

export default class HomeForm extends React.Component {
  
state = {
    list: [      
    ],
    usersList: [
        
    ],
    eventsList: [],
    docList: []
}

constructor(props){
    super(props);
    this.getEventsListFunction = this.getEventsListFunction.bind(this)
}
newList = []
newEventsList = []
newDocList = []
getEventsListFunction = (e) => {
   
    axios.get('http://localhost:9000/getAdminListFunction').then((res) => {
        for(var i = 0; i < res.data.length; i++){
            this.newList.push({user: res.data[i].userName, event: res.data[i].eventTitle, role: res.data[i].role, assign: res.data[i].assign})                           
        }
        this.state.list.push(this.newList)
        
        axios.get('http://localhost:9000/getUsers').then((res) =>{
//            console.log(res.data)
            this.state.usersList.push(res.data)
            console.log("usersList", this.state.usersList)
            
            axios.get('http://localhost:9000/getEvents').then((res) =>{
                this.state.eventsList.push(res.data)
                this.props.browseUsersHandler(this.state.list, this.state.usersList, this.state.eventsList, this.state.docList)
            })
           
        })      
    });   
}    

getEventsFunction = (e) => {
    axios.get('http://localhost:9000/getEvents').then((res) => {
        console.log("dddb", res.data)
        for(var i = 0; i < res.data.length; i++){
            var dateStart = res.data[i]._startDate.split('T')
            var newDateFormatArr = dateStart[0].split('-')
            var newDateFormat = newDateFormatArr[2]+'/'+newDateFormatArr[1]+'/'+newDateFormatArr[0]
            var dateFinish = res.data[i]._finishDate.split('T')
            var newDateFormatArr1 = dateFinish[0].split('-')
            var newDateFormat1 = newDateFormatArr1[2]+'/'+newDateFormatArr1[1]+'/'+newDateFormatArr1[0]
            this.newEventsList.push({eventId: res.data[i]._id, eventTitle: res.data[i]._eventTitle, eventStartDate: newDateFormat, participants: res.data[i]._participants, cPlus1Date: res.data[i]._cPlus1Date, finishDate: newDateFormat1})
        }
        console.log(this.state.eventsList)
        this.state.eventsList.push(this.newEventsList)
        console.log(this.newEventsList)
        this.props.browseEventsHandler(this.state.list, this.state.usersList, this.state.eventsList, this.state.docList)
    })
}

getDocumentsFunction = (e) => {
    axios.get('http://localhost:9000/getDocuments').then((res) => {
//        console.log(res.data)
        for (var i = 0; i < res.data.length; i++){
            this.newDocList.push({eventId: res.data[i]._eventId, day: res.data[i]._day, for: res.data[i]._for, title: res.data[i]._docTitle})
        }
        this.state.docList.push(this.newDocList)
        console.log(this.state.docList)
        this.props.browseDocsHandler(this.state.list, this.state.usersList, this.state.eventsList, this.state.docList)
    })
}

render() {
    return (
        <div className="homeForm-block">
            {this.props.role !== "No role" ? (
                <div className="homeForm-block_users"><div className="homeForm-block_header">Users</div>
                <p onClick={this.getEventsListFunction}>Browse</p>
                <p>Create</p>
                <p>Assign</p>
            </div>
            ):""}
            
             <div className="homeForm-block_events">
                <div className="homeForm-block_header">
                    Events
                </div>
                <p onClick={this.getEventsFunction}>Browse</p>
                {this.props.role !== "No role" ? (
                    <p onClick={this.props.createEventsHandler}>Create</p>
                    
                ):""}

                 <p>Assign</p>
            </div>
                
            <div className="homeForm-block_documents">
                <div className="homeForm-block_header">
                    Documents
                </div>
                <p onClick={this.getDocumentsFunction}>Browse</p>
                {this.props.role !== "No role" ? (
                    <p onClick={this.props.createDocHandler}>Create</p>
                ):""}
                
                <p>Download</p>
            </div>
        </div>
        );
    }
}