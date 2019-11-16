import React, { Component } from 'react'
import SideUserInfo from '../component/SideUserInfo'
import {reqFollow, reqUnFollow, reqUser} from '../api'
import {userInfoWrapper} from '../redux/Wrapper'

class SideUserInfoContainer extends Component{

    state = {
        followBtnLoading:false, 
        items:[
            {label:'Username', text:'xxx'},
            {label:'Articles', text:'xxx'},
            {label:'Followers', text:'xxx'},
            {label:'Following', text:'xxx'}
        ],
        followBtnText:'Follow',
        curUser:{}
    }

    onClickFollow = ()=>{
        console.log('onClickFollow')
        const data = {actionUsername:this.props.userInfo.username, targetUsername:this.props.curUsername}
        this.setState({followBtnLoading:true})
        if (this.state.followBtnText === 'Following'){
            this.unFollow(data)
        }else{
            this.follow(data)
        }
    }

    follow = async (data)=>{
        let res = await reqFollow(data)
        const {targetUser} = res.data
        this.setState({followBtnLoading:false, followBtnText:'Following', items:this.userToItems(targetUser)})
    }

    unFollow = async (data)=>{
        console.log('unFollow')
        let res = await reqUnFollow(data)
        const {targetUser} = res.data
        this.setState({followBtnLoading:false, followBtnText:'Follow', items:this.userToItems(targetUser)})
    }

    userToItems = (userInfo)=>{
        console.log('userToItems userInfo', userInfo)
        const items = [
            {label:'Username', text:userInfo.username},
            {label:'Articles', text:userInfo.articleCount},
            {label:'Followers', text:userInfo.followers.length},
            {label:'Following', text:userInfo.following.length}
        ]
        return items
    }

    getUser = async ()=>{
        const data = {actionUsername:this.props.userInfo.username, targetUsername:this.props.curUsername}
        let res = await reqUser(data)
        const items = this.userToItems(res.data)
        this.setState({items, followBtnText: res.data.followed ? 'Following' : 'Follow', curUser:res.data})
    }

    
    componentDidMount(){
        console.log('2222222222222', this.props.userInfo.username, this.props.curUsername)
        this.getUser()
    }

    render(){
        const {curUsername} = this.props
        const isSelf = curUsername === this.props.userInfo.username
        console.log('render', this.props.userInfo.username)
        return (
            this.props.userInfo.username ?
            <SideUserInfo 
                isSelf={isSelf} 
                onFollow={this.onClickFollow} 
                followBtnLoading={this.state.followBtnLoading}
                items={this.state.items}
                followBtnText={this.state.followBtnText}
                avatar={this.state.curUser.avatar}
            /> :
            <div></div>
        )
    }
}

export default userInfoWrapper(SideUserInfoContainer)