import { connect } from 'react-redux'
import TopBar from '../component/TopBar'
import {updateUserInfo} from '../actions'
import React, { Component } from 'react'
import axios from 'axios';

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo,
})
    
const mapDispatchToProps = (dispatch, ownProps) => ({
    clearUserInfo: () => dispatch(updateUserInfo({}))
})

class UserTopBar extends Component{
    
    onLogout = ()=>{
        console.log('onLogout')
        axios.get('/api/logout').then((response) => {
            this.props.clearUserInfo()
        }).catch((err) => console.log(err))
    }

    render(){
        let {url} = this.props
        return(
            <TopBar onLogout={this.onLogout} userInfo={this.props.userInfo} url={url}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTopBar)