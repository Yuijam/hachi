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

class UserTopBar extends Component{
    
    onLogout = ()=>{
        console.log('onLogout')
        axios.get('/api/logout').then((response) => {
            this.props.clearUserInfo()
        }).catch((err) => console.log(err))
    }

    render(){
        let {url, buttonVisible, userInfo, isWritePage} = this.props
        return(
			// <PageHeader title="Hachi" subTitle="ready to work" extra={[<Button key='3' onClick={this.onLogout}>Logout</Button>, <Button key='2'>{this.props.userInfo.username}</Button>]}/>

            <TopBar onLogout={this.onLogout} userInfo={userInfo} url={url} buttonVisible={buttonVisible} isWritePage={isWritePage}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTopBar)