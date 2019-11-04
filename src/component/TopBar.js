import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './css/TopBar.css'
import { PageHeader, Button } from 'antd';
import 'antd/dist/antd.css';

class TopBar extends Component{

    render(){
        let {extra} = this.props
        // console.log('topbar userinfo = ', userInfo)
        return(
            <PageHeader 
                title="Hachi" 
                subTitle="ready to work" 
                extra= {[
                    extra
                    // <Link key='6' to={{pathname:`/user/${userInfo.username}/`}} className='topbar-nav'>Home</Link>,
                    // <Link key='5' to={{pathname:`/user/${userInfo.username}/timeline`}} className='topbar-nav'>Timeline</Link>,
                    // <Link key='4' to={{pathname:`/user/${userInfo.username}/write`}}><Button>Write</Button></Link>, 
                    // <Button key='3' onClick={onLogout}>Logout</Button>, 
                    // <Link key='2' to={{pathname:`/user/${userInfo.username}/profile`}}><Button>{userInfo.username}</Button></Link> 
                ]}
            />
        );
    }
}

export default TopBar