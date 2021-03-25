import React from 'react';
import swal from 'sweetalert';
import './Style.css';

export class UserForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {firstname: '', lastname: '', username:'', email:'', password:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // event.preventDefault();

        
        if (!this.state.firstname.length || !this.state.lastname.length || !this.state.username.length || !this.state.email.length || !this.state.password.length){
            swal({
                title: "Wrong Data",
                icon: "error"
            })
        }else{
            this.props.axios.post('http://localhost:8080/api/user', {
                id: this.props.actualId,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
            .then(function (response) {
                console.log(response.data);
                swal({
                    title: "Post Request Done :)",
                    icon: "success"
                })
            })
            .catch(function (error) {
                console.log(error);
            });
            
        }
        
    }

    handleChange(event){
        this.setState({ [event.target.name] : event.target.value});    
    }

    render(){
        return(
            <div className="userForm">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Firstname:
                        <input name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} />         
                    </label>

                    <label>
                        Lastname:
                        <input name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} />         
                    </label>

                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />         
                    </label>

                    <label>
                        Email:
                        <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />         
                    </label>

                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />         
                    </label>

                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}