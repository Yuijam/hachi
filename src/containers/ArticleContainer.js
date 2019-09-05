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
        title: '',
        text_md: '',
        text_origin:'',
        del:false,
        redir:false
    }

    constructor(props){
        super(props);
        this._isMounted = false;
    }

    componentDidMount(){
        let {match} = this.props
        this._isMounted = true;
        axios.get(`/api/article/${match.params.id}`).then((response) => {
            if (this._isMounted){
                this.setState({id:match.params.id, title:response.data.title, text_md:response.data.text_md, text_origin:response.data.text_origin});
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

        if (del) return <Redirect to={`/user/${this.props.userInfo.username}`}/>;

        if (redir) {
            histroy.replace(`/user/${this.props.userInfo.username}/edit`)
            return;
        }
        
        return (
            <Article 
                {...this.state} 
                onDelete={this.onDelete} 
                toEditUrl={{pathname:`/user/${this.props.userInfo.username}/edit`, state:this.state}}
            />
        )
    }
}

export default connect(mapStateToProps)(ArticleContainer)