import React, {Component} from 'react'
import WriteNew from './WriteNew'
import {Redirect} from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo
})

class WriteEdit extends Component{

    state = {redir:false}

    onPublish = (write_state) => {
        let {_id} = this.props.location.state
        axios.put(`/api/article/${_id}`, write_state).then((response) => {
            // console.log('add then data = ', response.data);
            this.articleData = {_id:_id, ...write_state}
            this.setState({redir:true})
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        let {redir} = this.state
        if (redir) return <Redirect to={
            {pathname:`/user/${this.props.userInfo.username}/article/${this.props.location.state._id}`, 
            articleData:this.articleData}
        }/>;
        let {title, text_origin, text_md} = this.props.location.state

        return(
            <WriteNew onPublish={this.onPublish} title={title} text_origin={text_origin} text_md={text_md} />
        );
    }
}

export default connect(mapStateToProps)(WriteEdit)