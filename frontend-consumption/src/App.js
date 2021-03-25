import axios from 'axios';
import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import { TaskApp } from './components/TaskApp';
import { UserApp } from './components/UserApp';

class App extends Component {

  componentDidMount() {
    
    axios.post('http://localhost:8080/user/login', {
        username: 'xyz',
        password: 'password'
    })
    .then(function (response) {
        console.log(response.data);
        localStorage.setItem("token",response.data.accessToken);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  UserView = () => (
    <div className="UserView">
      {localStorage.getItem('token') && <UserApp/>}
    </div>
  );
  
  TaskView = () => (
    <div className="taskView">
      {localStorage.getItem('token') && <TaskApp/>}
    </div>
  );

  MainView = () => (
    <div className="container">
         <ul>
            <li><Link to='/users'>Users</Link></li>
            <li><Link to='/tasks'>Tasks</Link></li>
        </ul> 
      
      <br/>
      
    </div>
  );

  render() {
      return (
          <div>
                <Router>
                    <div>
                        <Route path="/users" component={this.UserView}/>
                        <Route path="/tasks" component={this.TaskView}/>
                        <Route path="/main" component={this.MainView}/>   
                        <Route exact path="/"> {localStorage.getItem('token') ? <Redirect to="/main" /> : <h1>Get a Token or refresh</h1>}
                        </Route> 

                    </div>
                </Router>

          </div>
      );
  }
}

export default App;