import React, { Component } from 'react'
import NavMenu from '../component/NavMenu'
import { connect } from 'react-redux'
// import { Avatar } from 'antd';
import {updateUserInfo} from '../actions'
import axios from 'axios';

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    clearUserInfo: () => dispatch(updateUserInfo({})),
})

class NavMenuContainer extends Component{

    onLogout = ()=>{
        axios.get('/api/logout').then((response) => {
            this.props.clearUserInfo()
        }).catch((err) => console.log(err))
    }

    render(){
        const menuItems = [
            {key:'home', text:'Home', url:`/user/${this.props.userInfo.username}/`},
            {key:'timeline', text:'Timeline', url:`/user/${this.props.userInfo.username}/timeline`},
            {key:'message', text:'Message',  url:`/user/${this.props.userInfo.username}/message`},
            {key:'write', text:'Write', url:`/user/${this.props.userInfo.username}/write`},
            {key:'avatar', text:`${this.props.userInfo.username}`,
                child:[
                    {key:'profile', text:'Profile', url:`/user/${this.props.userInfo.username}/profile`},
                    {key:'logout', text:'Logout', onClick:this.onLogout}
                ],
                
            },
        ]
    
        const unregisterItems = [
            {key:'register', text:'Register', url:`/register`},
            {key:'login', text:'Login', url:`/login`}
        ]
        let items = this.props.userInfo && this.props.userInfo.username ? menuItems : unregisterItems

        return (
            <div>
                <NavMenu items={items}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenuContainer)