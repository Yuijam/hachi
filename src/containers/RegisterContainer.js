import React, { Component } from 'react'
import axios from 'axios';
import Register from '../component/Register'
import {Redirect} from 'react-router-dom';
import { message } from 'antd';

class RegisterContainer extends Component{

    state = {registerSuc:false, hasError:false}

    onRegister = (values) =>{
        console.log('onRegister', values)
        axios.post('/api/register', values).then((response) => {
            console.log('register data = ', response.data);
            if (response.data.username && response.data.username === values.username){
                this.setState({registerSuc:true})
                message.success('Register Successed')
            }else if (response.data === 'usernameIsExist'){
                console.log('usernameIsExist')
                this.setState({hasError:true})
                message.error('Register Failed')
            }else if (response.data === 'emailIsExist'){
                console.log('emailIsExist')
                this.setState({hasError:true})
                message.error('Register Failed')
            }
        }).catch((error) => {
            console.log(error);
            message.error('Register Failed')
        });
    }

    render(){

        if (this.state.registerSuc){
            return <Redirect to={`/`}/>
        }
        // hasError for rerender orz！
        return(
            <Register handleSubmit={this.onRegister} hasError={this.state.hasError}/>
        );
    }
}

export default RegisterContainer