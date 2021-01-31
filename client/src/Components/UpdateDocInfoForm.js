import React from "react";
import axios from "axios";
import './EventsForm/UpdateEventInfoForm.css'

export default class UpdateDocInfoForm extends React.Component {
  
state = {
    docTitle: this.props.docTitle,
    day: this.props.day,
    content: this.props.content,
    _for: this.props._for
}

constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this)
//    this.updateDocHandler = this.updateDocHandler.bind(this)
}

onInputChange(event){
    this.setState({
        [event.target.name]: event.target.value
    });
}

updateDocFunction = (e) => {
    axios.post('http://localhost:9000/updateDocFunction', null, {
        params: {
            docId: this.props.docId,
            docTitle: this.state.docTitle, 
            day: this.props.day,
            content: this.props.content,
            _for: this.props._for
        }
    }).then((data) => {
        console.log(data.data)
        this.props.updateDocHandler(this.state.docTitle, this.state.day, this.state.content, this.state._for)
    })
}

render() {
    return (
        <div className="updateEventInfo-block">
            <label>Document Title: </label><input 
                type="text"
                value={this.state.docTitle}
                onChange={this.onInputChange}
                name="docTitle"/>
            <p>Day:<input 
                    type="text" 
                    value={this.state.day}
                    onChange={this.onInputChange}
                    name="day"/>
                </p>
                <p>Document Content: <input 
                    type="text" 
                    value={this.state.content}
                    onChange={this.onInputChange}
                    name="content"/>
                </p>
                <p>For: <input 
                    type="text" 
                    value={this.state._for}
                    onChange={this.onInputChange}
                    name="_for"/>
                </p>
            <div className="updateEventInfo-block_buttonDiv">
                <button onClick={this.updateDocFunction}>OK</button>
                <button onClick={this.props.cancelHandler}>Cancel</button>
            </div>
        </div>
        )
    }
}