import React, {Component} from 'react'
import WriteNew from './WriteNew'
import {Redirect} from "react-router-dom";
import axios from 'axios';

class WriteEdit extends Component{

    state = {redir:false}

    onPublish = (write_state) => {
        let {id} = this.props.location.state
        axios.put(`/api/article/${id}`, write_state).then((response) => {
            console.log('add then data = ', response.data);
            this.setState({redir:true})
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        let {redir} = this.state
        if (redir) return <Redirect to={`/article/${this.props.location.state.id}`}/>;
        let {title, text_origin, text_md} = this.props.location.state

        return(
            <WriteNew onPublish={this.onPublish} title={title} text_origin={text_origin} text_md={text_md} />
        );
    }
}

export default WriteEdit