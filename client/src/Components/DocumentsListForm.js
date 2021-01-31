import React from "react";
import axios from "axios";

export default class DocumentsListForm extends React.Component {

constructor(props){
    super(props);
}   
    
render() {
    return (
        <div className="eventsListForm-table">
            {console.log(this.props.docList[0])}
            <table>
                <tr>
                    <th>Document</th>
                    <th>Day</th>
                    <th>For</th>
                 </tr>
                {this.props.docList[0].map((item) => {
                    return(
                        <tr>
                            <td>{item.title}</td>
                            <td>{item.day}</td>
                            <td>{item.for}</td>
                        </tr>
                    )
                })}
            </table>
            <div className="eventsListForm-table_buttonDiv">
                <button onClick={this.props.addDocumentHandler}>Add Docuemnt</button>
            </div>
        </div>         
        );
    }
}