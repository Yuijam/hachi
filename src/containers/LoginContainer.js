import Login from '../component/Login.jsx'
import { connect } from 'react-redux'
import {login} from '../redux/Actions.js'
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

class LoginContainer extends Component{

    state = {loading:false}

    onLogin = async (values)=>{
        console.log('LoginContainer  onLogin')
        this.setState({loading:true})

        this.props.login(values.username, values.password)
    }

    render(){
        console.log("this.props.userInfo = ", this.props.userInfo)
        const {userInfo} = this.props
        if (userInfo && userInfo.username) {
            return <Redirect to={`/user/${userInfo.username}/`}/>
        }

        return (
            <Login onLogin={this.onLogin} loading={this.state.loading}/>
        )
    }
}

export default connect(state => ({userInfo: state.userInfo}), {login})(LoginContainer)