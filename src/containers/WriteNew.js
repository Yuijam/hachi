import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import { connect } from 'react-redux'
import axios from 'axios';
import Write from '../component/Write'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo,
})

class WriteNew extends Component{

    state = {id:'', redir:false, isDoneLoading:false}

    onPublish = (write_state) => {
        let articleInfo = {...write_state, owner:this.props.userInfo.username}
        this.setState({isDoneLoading:true})
        if (this.props.onPublish){
            this.props.onPublish(articleInfo)
        }else{
            this.publishNew(articleInfo)
        }
    }

    publishNew = (articleInfo) => {
        axios.post('/api/article', articleInfo).then((response) => {
            console.log('add then data = ', response.data);
            this.articleData = {_id:response.data.insertedId, ...articleInfo}
            this.setState({redir:true, id:response.data.insertedId})
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        let {redir} = this.state
        if (redir) return <Redirect to={{pathname:`/user/${this.props.userInfo.username}/article/${this.state.id}`, articleData:this.articleData}}/>;
        let {title, text_origin, text_md} = this.props
        return(
            <Write onPublish={this.onPublish} title={title} text_origin={text_origin} text_md={text_md} isDoneLoading={this.state.isDoneLoading}/>
        );
    }
}

export default connect(mapStateToProps)(WriteNew)