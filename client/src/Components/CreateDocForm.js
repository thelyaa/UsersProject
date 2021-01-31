import React from "react";
import axios from "axios";

export default class CreateDocForm extends React.Component {

state = {
    docTitle: "",
    day: "",
    content: "",
    _for: ""
}

constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.createDocFunction = this.createDocFunction.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
}

onInputChange(event){
    this.setState({
        [event.target.name]: event.target.value
    });
}

handleChangeRole(e) {
    this.setState({_for: e.target.options[e.target.selectedIndex].text})
}

docInfo = []
createDocFunction = (e) => {
    axios.post('http://localhost:9000/createDoc', null, {
        params: {
            docTitle: this.state.docTitle,
            day: this.state.day,
            content: this.state.content,
            for: this.state._for
        }
    }).then((data) => {
        console.log("success")
        this.docInfo.push({docId: data.data, docTitle: this.state.docTitle, day: this.state.day, content: this.state.content, for: this.state._for})
        this.props.createDocHandler(this.docInfo)
    });
}

render() {
    return (
        <div className="createEvents-block">
            <label>Document Title</label><input 
                type="text"
                className="createEvents-block_input_title"
                onChange={this.onInputChange}
                name="docTitle"/>
            <p><label>Day</label><input 
                type="text"
                className="createEvents-block_input_start"
                value={this.state.day}
                name="day"
                onChange={this.onInputChange}/>
            </p>
            <p><label>Document Content</label><input 
                type="text"
                className="createEvents-block_input_start"
                value={this.state.content}
                name="content"
                onChange={this.onInputChange}/>
            </p>
            <p><label>For</label>
                <select onChange={this.handleChangeRole}>
                    <option value="Experts">Experts</option>
                    <option value="Competitors">Competitors</option>
                </select>
            </p>
            <div className="createEvents-block_buttonDiv">
                <button onClick={this.createDocFunction}>OK</button>
                <button onClick={this.props.cancelHandler}>Cancel</button>
            </div>
        </div>         
        );
    }
}