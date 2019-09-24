import React, { Component } from 'react'
import axios from 'axios';
import Register from '../component/Register'
import {Redirect} from 'react-router-dom';
import { message } from 'antd';

class RegisterContainer extends Component{

    state = {registerSuc:false}

    onRegister = (values) =>{
        console.log('onRegister', values)
        axios.post('/api/register', values).then((response) => {
            console.log('register data = ', response.data);
            this.setState({registerSuc:true})
            message.success('Register Successed')
        }).catch((error) => {
            console.log(error);
            message.error('Register Failed')
        });
    }

    render(){

        if (this.state.registerSuc){
            return <Redirect to={`/`}/>
        }

        return(
            <Register handleSubmit={this.onRegister}/>
        );
    }
}

export default RegisterContainer