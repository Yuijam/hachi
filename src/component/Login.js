import React, { Component } from 'react'
import './css/Login.css'
import axios from 'axios';

class Login extends Component{

    onLogin = (e) =>{
        console.log('onlogin')
        e.preventDefault();
        axios.post('/api/login', this.state).then((response) => {
            console.log('login data = ', response.data);
            if (response.data.length > 0){
                console.log('log sucess')
                this.props.setUserInfo(response.data[0])
                this.history.goBack();
            }else{
                console.log('login fail')
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    onClose = (e) =>{
        e.stopPropagation();
        this.history.goBack();
    }

    handleUsernameChange = (e) => {
        this.setState({username:e.target.value})
    }

    handlePasswordChange = (e) => {
        this.setState({password:e.target.value})
    }

    render(){
        this.history = this.props.history

        return(
            <div className='login-body'>
                <form className='main' onSubmit={this.onLogin}>
                    <p>Login</p>
                    username:<input type='text' onChange={this.handleUsernameChange}/><br/><br/>
                    password:<input type='password' onChange={this.handlePasswordChange}/><br/><br/>
                    <button type='submit'>Login</button>
                    {/* <span className='close'></span> */}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button onClick={this.onClose}>Close</button>
                </form>
            </div>
        );
    }
}

export default Login