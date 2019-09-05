import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import { connect } from 'react-redux'
import Write from '../component/Write'
import axios from 'axios';

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo
})

class WriteNew extends Component{

    state = {id:'', redir:false}

    onPublish = (write_state) => {
        console.log(this)
        let articleInfo = {...write_state, username:this.props.userInfo.username}
        if (this.props.onPublish){
            console.log('11 articleInfo', articleInfo)
            this.props.onPublish(articleInfo)
        }else{
            this.publishNew(articleInfo)
        }
    }

    publishNew = (articleInfo) => {
        axios.post('/api/article', articleInfo).then((response) => {
            console.log('add then data = ', response.data);
            this.setState({redir:true, id:response.data.insertedId})
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){

        let {redir} = this.state
        if (redir) return <Redirect to={`/article/${this.state.id}`}/>;
        let {title, text_origin, text_md} = this.props
        
        return(
            <Write onPublish={this.onPublish} title={title} text_origin={text_origin} text_md={text_md}/>
        );
    }
}

export default connect(mapStateToProps)(WriteNew)