import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Article from '../component/Article'
// import Write from '../component/Write';
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo
})

class ArticleContainer extends Component{

    state={
        id: -1,
        owner:'',
        title: '',
        text_md: '',
        text_origin:'',
        del:false,
        redir:false
    }
    
    _isMounted = false;

    componentDidMount(){
        let {match} = this.props
        this._isMounted = true;
        axios.get(`/api/article/${match.params.id}`).then((response) => {
            if (this._isMounted){
                // console.log('2222222222response', response.data)
                this.setState({owner:response.data.owner, id:match.params.id, title:response.data.title, text_md:response.data.text_md, text_origin:response.data.text_origin});
                // console.log({id:match.params.id, ...response.data})
                // this.state({id:match.params.id, ...response.data})
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    onDelete = (e)=>{
        e.preventDefault();
        axios.delete(`/api/article/${this.state.id}`).then((response) => {
            console.log('on del article = ', response.data);
            this.setState({del:true})
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        let {redir, del} = this.state;
        let {histroy} = this.props;
        console.log('this.props.userInfo = ', this.props.userInfo)
        let {username=''} = this.props.userInfo
        let isOwner = this.state.owner === username
        if (del) return <Redirect to={`/user/${username}`}/>;

        if (redir) {
            histroy.replace(`/user/${username}/edit`)
            return;
        }
        
        return (
            <Article 
                {...this.state} 
                onDelete={this.onDelete} 
                isOwner={isOwner}
                toEditUrl={{pathname:username ? `/user/${username}/edit` : '', state:this.state}}
            />
        )
    }
}

export default connect(mapStateToProps)(ArticleContainer)