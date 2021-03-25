import axios from 'axios';
import React from 'react';
import { UserForm } from './UserForm';
import { UserList } from './UserList';

export class UserApp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
        };
    }

    componentDidMount() {
    
        axios.get('http://localhost:8080/api/user',{ headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        .then(response => response.data)
        .then(data => {
            let userList = [];
            data.forEach(function (user) {
                userList.push(
                    user
                )
    
            });
            this.setState({userList: userList});
        })
        .catch(function (error) {
            console.log(error);
        });
      }

    render(){
        return(
            <div>
                <UserList userList={this.state.userList}/>
                <UserForm/>
            </div>
        );
    }
}