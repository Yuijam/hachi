import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './css/TopBar.css'
import { PageHeader, Button } from 'antd';
import 'antd/dist/antd.css';

class TopBar extends Component{

    render(){
        let {userInfo, onLogout=()=>{}, url} = this.props
        console.log('topbar userinfo = ', userInfo)
        return(
            userInfo && userInfo.username && userInfo.username !== 'undefined'
            ?   <PageHeader 
                    title="Hachi" 
                    subTitle="ready to work" 
                    extra={[<Button key='3' onClick={onLogout}>Logout</Button>, <Link key='2' to={{pathname:`/user/${userInfo.username}`}}><Button>{userInfo.username}</Button></Link> ]}
                />
            
            :  
                <PageHeader 
                    title="Hachi" 
                    subTitle="ready to work" 
                    extra={[
                        <Link key='3' to={{pathname:'/register', state:{isFloatPage:true}}}><Button key='3'>Register</Button></Link>
                    , <Link key='2' to={{pathname:'/login', state:{isFloatPage:true}}}><Button key='2'>Login</Button></Link> ]}
                />
                // <div className='topbar-body'>
                //     <Link className='register' to={{pathname:'/register', state:{isFloatPage:true}}}>Register</Link>
                //     <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                //     <Link className='login' to={{pathname:'/login', state:{isFloatPage:true}}}>Login</Link>
                // </div>
        );
    }
}

export default TopBar