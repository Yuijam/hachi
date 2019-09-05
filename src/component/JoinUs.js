import React, { Component } from 'react'
import { connect } from 'react-redux'
import {updateUserInfo} from '../actions'
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';
import './css/JoinUs.css'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo))
})

class JoinUs extends Component{

    onLogin(){
        console.log('onlogin')

    }

    onRegister(){

    }
    render(){
        let {userInfo} = this.props;
        if (userInfo) return <Redirect to={`/user/${userInfo.username}`}/>

        return (
            <div className='joinus-body'>
                <h1>Join Us?</h1>
                <Link to={{pathname:'/login', state:{isFloatPage:true}}}><button type='button'>Login</button></Link>
                <Link to={{pathname:'/register', state:{isFloatPage:true}}}><button type='button'>Register</button></Link>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinUs);