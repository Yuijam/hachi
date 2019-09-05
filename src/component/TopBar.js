import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './css/TopBar.css'


class TopBar extends Component{

    render(){
        let {userInfo, onLogout=()=>{}, url} = this.props
        console.log('topbar userinfo = ', userInfo)
        return(
            userInfo && userInfo.username && userInfo.username !== 'undefined'
            ?   <div className='topbar-body'>
                    <Link className='write' to={`${url}/write`}>Write</Link>
                    <Link className='username' to={{pathname:`/user/${userInfo.username}`, state:{name:'i_am_username oh no'}}}>{userInfo.username}</Link>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Link className='login-out' to='#' onClick={onLogout}>Logout</Link>
                </div>
            :  
                <div className='topbar-body'>
                    <Link className='register' to={{pathname:'/register', state:{isFloatPage:true}}}>Register</Link>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Link className='login' to={{pathname:'/login', state:{isFloatPage:true}}}>Login</Link>
                </div>
        );
    }
}

export default TopBar