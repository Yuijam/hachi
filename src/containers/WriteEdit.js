import React, {Component} from 'react'
import WriteNew from './WriteNew'
import {Redirect} from "react-router-dom";
import { connect } from 'react-redux'
import {reqEditArticle} from '../api'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo
})

class WriteEdit extends Component{

    state = {redir:{isRedir:false, redirectTo:''}}

    onPublish = async (writeState) => {
        let res = await reqEditArticle(writeState)
        const articleData = res.data
        this.setState({
            redir:{
                isRedir:true, 
                redirectTo:<Redirect to={{
                pathname:`/user/${articleData.owner}/article/${articleData._id}`, 
                articleData}}/>
            }
        })
    }

    render(){
        let {redir} = this.state
        if (redir.isRedir) return redir.redirectTo

        return(
            <WriteNew 
                {...this.props}
                onPublish={this.onPublish} 
            />
        );
    }
}

export default connect(mapStateToProps)(WriteEdit)