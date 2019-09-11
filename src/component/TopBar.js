import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './css/TopBar.css'
import { PageHeader, Button } from 'antd';
import 'antd/dist/antd.css';

class TopBar extends Component{

    render(){
        let {userInfo, onLogout=()=>{}, buttonVisible, isWritePage} = this.props

        console.log('topbar userinfo = ', userInfo)
        console.log('topbar buttonVisible = ', buttonVisible)
        return(
            userInfo && userInfo.username && userInfo.username !== 'undefined'
            ?   <PageHeader 
                    title="Hachi" 
                    subTitle="ready to work" 
                    extra={[
                        isWritePage ? <Button key='5' onClick={onLogout}>Done</Button> : null, 
                        !isWritePage ? <Link key='4' to={{pathname:`/user/${userInfo.username}/write`}}><Button>Write</Button></Link> : null, 
                    <Button key='3' onClick={onLogout}>Logout</Button>, 
                    <Link key='2' to={{pathname:`/user/${userInfo.username}/`}}><Button>{userInfo.username}</Button></Link> ]}
                />
            
            :  
                <PageHeader 
                    title="Hachi" 
                    subTitle="ready to work" 
                    extra={[
                        <Link key='3' to={{pathname:'/register', state:{isFloatPage:true}}}><Button key='3'>Register</Button></Link>
                    , <Link key='2' to={{pathname:'/login', state:{isFloatPage:true}}}><Button key='2'>Login</Button></Link> ]}
                />
        );
    }
}

export default TopBar