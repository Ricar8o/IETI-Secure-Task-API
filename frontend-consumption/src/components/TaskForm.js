import { format, isValid } from 'date-fns';
import React from 'react';
import swal from 'sweetalert';
import './Style.css';


let today = formatDate(new Date());
export class TaskForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {description: '', dueDate: today, status: '', responsible: '', email: ''};
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeResponsible = this.handleChangeResponsible.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeDescription(event) {
        this.setState({description: event.target.value});  
    }

    handleChangeDate(event) {
        this.setState({dueDate: event.target.value});  
    }

    handleChangeStatus(event) {
        this.setState({status: event.target.value});  
    }

    handleChangeResponsible(event) {
        this.setState({responsible: event.target.value});  
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});  
    }

    handleSubmit(event) {
        if (!this.state.description.length || !this.state.status.length || !this.state.responsible.length || !this.state.email.length){
            swal({
                title: "Wrong Data",
                icon: "error"
            })
        }else{
            fetch('https://task-app-api.azurewebsites.net/api/add-task?code=qKsRlDPr4CTOxbjovixW1PDaTnWINmOQXJcYVaahS17gVdrxqYuEeQ==', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description : this.state.description,
                    status : this.state.status,
                    dueDate : this.state.dueDate,
                    responsible : this.state.responsible,
                    email : this.state.email
                })
            })
            
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
            swal({
                title: "Post Request Done :)",
                icon: "success"
            })
        }
      
      event.preventDefault();
    }

    render(){
        return(
            <div className="taskForm">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Description:
                        <input type="text" value={this.state.description} onChange={this.handleChangeDescription} />         
                    </label>
                    <br/>
                    <label>
                        Date:
                        <input
                            id="new-todo-date"
                            onChange={this.handleChangeDate}
                            value={this.state.dueDate}
                            type = "date"
                            min= {today}
                        />         
                    </label>
                    <br/>

                    <label>
                        Status:  
                        <select value={this.state.status} onChange={this.handleChangeStatus}>      
                            <option ></option>      
                            <option value="Done">Done</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Ready">Ready</option>
                        </select>      
                    </label>
                    
                    
                    <label>
                        Responsible Name:
                        <input type="text" value={this.state.responsible} onChange={this.handleChangeResponsible} />         
                    </label>

                    <label>
                        Responsible Email:
                        <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />         
                    </label>

                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

function formatDate(date){
    const dateFormat = "yyyy-MM-dd";
    if (isValid(date)){
        return format(date,dateFormat);
    }
    return null;
}