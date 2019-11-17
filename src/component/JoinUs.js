import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';
import './css/JoinUs.css'
import { Button } from 'antd';

import {userInfoWrapper} from '../redux/Wrapper'

class JoinUs extends Component{

    render(){
        console.log('Join us render')
        let {userInfo} = this.props;
        if (userInfo && userInfo.username) return <Redirect to={`/user/${userInfo.username}`}/>
        console.log('Join us render 2')

        return (
            <div className='joinus-body'>
                <h1 className='title'>Join Us?</h1>
                <Link to={{pathname:'/login', state:{isFloatPage:true}}}><Button >Login</Button></Link>
                <Link to={{pathname:'/register', state:{isFloatPage:true}}}><Button >Register</Button></Link>
            </div>
        )
    }
}

export default userInfoWrapper(JoinUs)