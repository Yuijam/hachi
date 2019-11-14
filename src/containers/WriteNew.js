import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import { connect } from 'react-redux'
import Write from '../component/Write'
import {reqPostArticle} from '../api'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo,
})

class WriteNew extends Component{

    state = {redir:{isRedir:false, redirectTo:''}, isDoneLoading:false}

    onPublish = (write_state) => {
        let articleInfo = {...write_state, owner:this.props.userInfo.username, writeTime:Number(new Date().valueOf())}
        this.setState({isDoneLoading:true})
        if (this.props.onPublish){
            this.props.onPublish(articleInfo)
        }else{
            this.publishNew(articleInfo)
        }
    }

    onCancel = ()=>{
        if (this.props.onCancel){
            this.props.onCancel()
        }else{
            if (this.props.history){
                this.props.history.goBack();
            }
        }
    }

    publishNew = async (articleInfo) => {
        delete articleInfo._id
        let res = await reqPostArticle(articleInfo)
        console.log('publishNew', res)
        this.setState({
            redir:{
                isRedir:true, 
                redirectTo:<Redirect to={{
                pathname:`/user/${this.props.userInfo.username}/article/${res.data._id}`, 
                articleData:res.data}}/>
            }
        })
    }

    render(){
        let {redir} = this.state
        if (redir.isRedir) return redir.redirectTo;
        console.log(this.props)
        let {articleData} = this.props.location
        return(
            <Write 
                onPublish={this.onPublish} 
                onCancel={this.onCancel}
                articleData={articleData}
                isDoneLoading={this.state.isDoneLoading}
            />
        );
    }
}

export default connect(mapStateToProps)(WriteNew)