import Login from '../component/Login'
import { connect } from 'react-redux'
import {updateUserInfo} from '../actions'
import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { message } from 'antd';

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo))
})

class LoginContainer extends Component{

    state = {loading:false, username:''}

    onLogin = (values)=>{
        console.log('LoginContainer  onLogin')
        this.setState({loading:true})

        axios.post('/api/login', values).then((response) => {
            console.log('login data = ', response.data);
            if (response.data) {
                console.log('log sucess')
                this.props.setUserInfo(response.data)
                this.setState({loading:false, username:response.data.username})
                // this.history.goBack();
                message.success('Login Successed!')
            } else {
                this.setState({loading:false})
                console.log('login fail')
                message.error('Login Failed!');
            }
        }).catch((error) => {
            this.setState({loading:false})
            console.log(error);
            message.error('Login Failed!');
        });
    }

    render(){
        if (this.state.username) {
            return <Redirect to={`/user/${this.state.username}/`}/>
        }

        return (
            <Login onLogin={this.onLogin} loading={this.state.loading}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)