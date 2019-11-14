import React, { Component } from 'react'
import Register from '../component/Register'
import {Redirect} from 'react-router-dom';
import { message } from 'antd';
import {reqRegister, reqCheckExist} from '../api'

class RegisterContainer extends Component{

    state = {registerSuc:false, hasError:false}

    onRegister = async (values) =>{
        console.log('onRegister', values)
        let res = await reqRegister(values)
        console.log('onRegister res', res)

        if (res.status === 0){
            this.setState({registerSuc:true})
            message.success('Register Successed')
        }else{
            const {field, value, msg} = res.errorData
            this.form.setFields({ [field]: { value: value, errors: [new Error(msg)] } })
        }

        // axios.post('/api/register', values).then((response) => {
        //     console.log('register data = ', response.data);
        //     if (response.data.username && response.data.username === values.username){
        //         this.setState({registerSuc:true})
        //         message.success('Register Successed')
        //     }else if (response.data === 'usernameIsExist'){
        //         console.log('usernameIsExist')
        //         this.setState({hasError:true})
        //         message.error('Register Failed')
        //     }else if (response.data === 'emailIsExist'){
        //         console.log('emailIsExist')
        //         this.setState({hasError:true})
        //         message.error('Register Failed')
        //     }
        // }).catch((error) => {
        //     console.log(error);
        //     message.error('Register Failed')
        // });
    }

    checkExist = (json)=>{
        let res = reqCheckExist(json)
        return res
    }

    render(){

        if (this.state.registerSuc){
            return <Redirect to={`/`}/>
        }
        // hasError for rerender orz！
        return(
            <Register 
                handleSubmit={this.onRegister} 
                hasError={this.state.hasError}
                setForm={(form) => {this.form = form}}
                checkExist={this.checkExist}
            />
        );
    }
}

export default RegisterContainer