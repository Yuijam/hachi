import React, { Component } from 'react'
import axios from 'axios';
import Register from '../component/Register'
import {Redirect} from 'react-router-dom';

class RegisterContainer extends Component{

    state = {registerSuc:false}

    onRegister = (values) =>{
        console.log('onRegister', values)
        axios.post('/api/register', values).then((response) => {
            console.log('register data = ', response.data);
            if (response.data.ok === 1){
                this.setState({registerSuc:true})
            }else{
                console.log('Register ERROR')
            }
        }).catch((error) => {
            console.log(error);
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