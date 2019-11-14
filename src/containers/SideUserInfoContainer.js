import React, { Component } from 'react'
import SideUserInfo from '../component/SideUserInfo'
import {connect} from 'react-redux'
import {reqFollow, reqUnFollow, reqUser} from '../api'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo,
})

class SideUserInfoContainer extends Component{

    state = {
        followBtnLoading:false, 
        items:[
            {label:'Username', text:'xxx'},
            {label:'Followers', text:'xxx'},
            {label:'Following', text:'xxx'},
            {label:'Articles', text:'xxx'}
        ],
        followBtnText:'Follow',
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
        // axios.put('/api/follow', data).then((response) => {
        //     console.log('follow data = ', response.data);
        //     const {targetUser} = response.data
        //     this.setState({followBtnLoading:false, followBtnText:'Following', items:this.userToItems(targetUser)})
        // }).catch((error) => {
        //     console.log(error);
        // });
    }

    unFollow = async (data)=>{
        console.log('unFollow')
        let res = await reqUnFollow(data)
        const {targetUser} = res.data
        this.setState({followBtnLoading:false, followBtnText:'Follow', items:this.userToItems(targetUser)})
        // axios.put('/api/unfollow', data).then((response) => {
        //     console.log('unFollow data = ', response.data);
        //     const {targetUser} = response.data
        //     this.setState({followBtnLoading:false, followBtnText:'Follow', items:this.userToItems(targetUser)})
        // }).catch((error) => {
        //     console.log(error);
        // });
    }

    userToItems = (userInfo)=>{
        console.log('userToItems userInfo', userInfo)
        const items = [
            {label:'Username', text:userInfo.username},
            {label:'Followers', text:userInfo.followers.length},
            {label:'Following', text:userInfo.following.length},
            {label:'Articles', text:userInfo.articleCount}
        ]
        return items
    }

    getUser = async ()=>{
        const data = {actionUsername:this.props.userInfo.username, targetUsername:this.props.curUsername}
        let res = await reqUser(data)
        const items = this.userToItems(res.data)
        this.setState({items, followBtnText: res.data.followed ? 'Following' : 'Follow'})
        // axios.get('/api/user', {params:data}).then((response) => {
        //     console.log('/api/user', response.data)
        //     const items = this.userToItems(response.data)
        //     this.setState({items, followBtnText: response.data.followed ? 'Following' : 'Follow'})
        // }).catch((error) => {
        //     console.log(error);
        // });
    }

    
    componentDidMount(){
        console.log('2222222222222', this.props.userInfo.username, this.props.curUsername)
        this.getUser()
    }

    render(){
        const {curUsername} = this.props
        const isSelf = curUsername === this.props.userInfo.username
        console.log('render', this.props.userInfo.username)
        // if (!this.props.userInfo.username) return <div></div>
        return (
            this.props.userInfo.username ?
            <SideUserInfo 
                isSelf={isSelf} 
                onFollow={this.onClickFollow} 
                followBtnLoading={this.state.followBtnLoading}
                items={this.state.items}
                followBtnText={this.state.followBtnText}
            /> :
            <div></div>
        )
    }
}

export default connect(mapStateToProps)(SideUserInfoContainer)