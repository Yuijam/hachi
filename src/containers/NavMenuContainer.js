import React, { Component } from 'react'
import NavMenu from '../component/NavMenu'
import {reqLogout} from '../api'
import {userInfoWrapper} from '../redux/Wrapper'
import PropTypes from 'prop-types'

class NavMenuContainer extends Component{

    static propTypes = {
        userInfo: PropTypes.object,
        updateUserInfo: PropTypes.func
    }

    onLogout = ()=>{
        this.props.updateUserInfo({})
        reqLogout()
    }

    render(){
        const menuItems = [
            {key:'home', text:'Home', icon:'home', url:`/user/${this.props.userInfo.username}/`},
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

// export default connect(state=>({userInfo:state.userInfo}), {updateUserInfo})(NavMenuContainer)
export default userInfoWrapper(NavMenuContainer)