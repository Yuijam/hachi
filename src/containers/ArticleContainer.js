import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Article from '../component/Article'
// import Write from '../component/Write';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo
})

class ArticleContainer extends Component{

    state={
        del:false,
        redir:false
    }

    onDelete = (e)=>{
        e.preventDefault();
        let {articleData} = this.props.location
        axios.delete(`/api/article/${articleData._id}`).then((response) => {
            console.log('on del article = ', response.data);
            this.setState({del:true})
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        let {redir, del} = this.state;
        let {histroy} = this.props;
        let {articleData} = this.props.location
        if (!articleData) return <div></div>

        console.log('this.props.userInfo = ', this.props.userInfo)
        let {username=''} = this.props.userInfo
        let isOwner = articleData.owner === username
        if (del) return <Redirect to={`/user/${username}`}/>;

        if (redir) {
            histroy.replace(`/user/${username}/edit`)
            return;
        }
        
        return (
            <Article 
                {...articleData} 
                onDelete={this.onDelete} 
                isOwner={isOwner}
                toEditUrl={{pathname:username ? `/user/${username}/edit` : '', state:articleData}}
            />
        )
    }
}

export default connect(mapStateToProps)(ArticleContainer)