import React from "react";
import axios from "axios";

export default class DocumentsListForm extends React.Component {

constructor(props){
    super(props);
    this.getDocInfoFunction = this.getDocInfoFunction.bind(this);
}   
    
getDocInfoFunction(id){
    console.log(id)
    axios.post('http://localhost:9000/getDocumentInfo', null, {
        params: {
            id: id
        }
    }).then((data) => {
        console.log(data.data[0]._day)
        this.props.goToDocInfoHandler(id, data.data[0]._docTitle, data.data[0]._day, data.data[0]._content, data.data[0]._for)
    })
}   
    
render() {
    return (
        <div className="eventsListForm-table">
            <table>
                <tr>
                    <th>Document</th>
                    <th>Day</th>
                    <th>For</th>
                 </tr>
                {this.props.docList[0].map((item) => {
                    return(
                        <tr key={item.id} onClick={() => {this.getDocInfoFunction(item.id)}}>
                            <td>{item.title}</td>
                            <td>{item.day}</td>
                            <td>{item.for}</td>
                        </tr>
                    )
                })}
            </table>
            {this.props.role === "admin" ? (
                <div className="eventsListForm-table_buttonDiv">
                    <button onClick={this.props.addDocumentHandler}>Add Docuemnt</button>
                </div>
            ):""}            
        </div>         
        );
    }
}