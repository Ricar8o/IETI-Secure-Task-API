import axios from 'axios';
import React from 'react';
import { UserForm } from './UserForm';
import { UserList } from './UserList';

export class UserApp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            nextId: 0
        };
    }

    componentDidMount() {

        this.axios = axios.create({
            baseURL: 'http://localhost:8080/api/',
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}
        });
    
        this.axios.get('http://localhost:8080/api/user')
        .then(response => response.data)
        .then(data => {
            let userList = [];
            let actualId = 0;
            data.forEach(function (user) {
                userList.push(
                    user
                )
                if(user.id>actualId){
                    actualId = user.id;
                }
    
            });
            this.setState({userList: userList, nextId:actualId+1});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        return(
            <div>
                <UserList userList={this.state.userList} />
                <UserForm actualId={this.state.nextId} axios={this.axios}/>
            </div>
        );
    }
}