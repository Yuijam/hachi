import { connect } from 'react-redux'
import TopBar from '../component/TopBar'
import {updateUserInfo} from '../actions'
import React, { Component } from 'react'
import axios from 'axios';


const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo,
    buttonVisible: state.buttonVisible
})
    
const mapDispatchToProps = (dispatch, ownProps) => ({
    clearUserInfo: () => dispatch(updateUserInfo({})),
})

class TopBarContainer extends Component{
    
    onLogout = ()=>{
        console.log('onLogout')
        axios.get('/api/logout').then((response) => {
            this.props.clearUserInfo()
        }).catch((err) => console.log(err))
    }

    onDone = ()=>{
        
    }

    render(){
        let {url, buttonVisible, userInfo} = this.props
        return(
            <TopBar onLogout={this.onLogout} userInfo={userInfo} url={url} buttonVisible={buttonVisible}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBarContainer)