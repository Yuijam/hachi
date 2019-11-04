import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from '../component/Profile'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo,
})

class ProfileContainer extends Component{

    items = [
        {label:'username', text:'kobebryant'},
        {label:'nickname', text:'bean'},
        {label:'email', text:'yuijam@live.com'}
    ]

    render(){
        let {userInfo, match} = this.props
        let {username:curUser} = match.params
        let isSelf = curUser === userInfo.username
        return (
            <div>
                <Profile items={this.items} isSelf={isSelf}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ProfileContainer)