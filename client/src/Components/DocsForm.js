import React from "react";
import axios from "axios";

export default class DocsForm extends React.Component {
  
constructor(props){
    super(props);
}

updateDocFunction = (e) => {
    this.props.updateDocInfoHandler(this.props.docTitle, this.props.day, this.props.content, this.props._for, this.props.docId)
}  

render() {
    return (
        <div className="eventsInfo">
            
            <div className="eventsInfo-block">
                <div className="eventsInfo-block_panel">
                    Document information
                    <button onClick={this.updateDocFunction}></button>
                </div>
                <p>Document title:<input 
                    type="text"
                    value={this.props.docTitle}/>
                </p>
                <p>Day:<input 
                    type="text" 
                    value={this.props.day}/>
                </p>
                <p>Document Content: <input 
                    type="text" 
                    value={this.props.content}/>
                </p>
                <p>For: <input 
                    type="text" 
                    value={this.props._for}/>
                </p>
            </div>
                               
            <div className="eventsInfo-block_buttonDiv">
                <button onClick={this.props.cancelHandler}>OK</button>
                <button onClick={this.props.cancelHandler}>Cancel</button>
                <button>Delete</button>
            </div>
        </div>
        )
    }
}