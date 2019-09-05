import React, { Component } from 'react'
import './css/Register.css'
import axios from 'axios';


class Register extends Component{

    onRegister = (e) =>{
        console.log('onRegister', this.state)
        e.preventDefault();
        axios.post('/api/register', this.state).then((response) => {
            console.log('register data = ', response.data);
            this.history.goBack();
        }).catch((error) => {
            console.log(error);
        });
    }

    onClose = (e) =>{
        e.stopPropagation();
        this.history.goBack();
    }

    handleUsernameChange = (e)=>{
        this.setState({username:e.target.value})
    }

    handleEmailChange = (e)=>{
        this.setState({email:e.target.value})
    }

    handlePasswordChange = (e)=>{
        this.setState({password:e.target.value})
    }


    render(){
        this.history = this.props.history

        return(
            <div className='register-body'>
                <form className='main' onSubmit={this.onRegister}>
                    <p>Register</p>
                    username:<input type='text' name='username' onChange={this.handleUsernameChange}/> <br/><br/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>email:<input type='email' name='email' onChange={this.handleEmailChange} /> <br/><br/>
                    password:<input type='password' name='psw' onChange={this.handlePasswordChange} /> <br/><br/>
                    <button type='submit'>Register</button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button onClick={this.onClose}>Close</button>
                </form>
            </div>
        );
    }
}

export default Register