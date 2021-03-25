import React from 'react';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import axios from 'axios';
 
export class TaskApp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
        };
    }

    componentDidMount() {
        
        this.axios = axios.create({
            baseURL: 'http://localhost:8080/api/',
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}
        });
    
        this.axios.get('http://localhost:8080/api/task')
        .then(response => response.data)
        .then(data => {
            let taskList = [];
            data.forEach(function (task) {
                taskList.push(
                    task
                )  
            });
            this.setState({taskList: taskList});
        })
        .catch(function (error) {
            console.log(error);
        });
      }

    render(){
        return(
            <div>
                <TaskList taskList={this.state.taskList}/>
                <TaskForm  axios={this.axios}/>
            </div>
        );
    }
}