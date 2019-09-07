import React, {Component} from 'react';
import ArticleList from '../component/ArticleList'
import axios from 'axios';

class ArticleListContainer extends Component{

    state = {username:'', article_list:[]}

    _isMounted = false;

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        let username = this.parseUsername(this.props)
        if (!username || username === 'undefined') {
            console.log('componentDidMount return')    
            return true
        };

        this.getData(username);
    }

    getData = (username)=>{
        axios.get(`/api/article_list?username=${username}`).then((response) => {
            console.log('getDate = ', response.data);
            if (this._isMounted){
                this.setState({username:username, article_list:response.data.article_list});
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    parseUsername(props){
        let {username} = props.match.params
        return username
    }

    componentWillReceiveProps(nextProps){
        // console.log('componentWillReceiveProps', nextProps)
        let username = this.parseUsername(nextProps)
        if (this.state.username === username || !username || username==='undefined') return false;
        this.getData(username);
        return true
    }

    render(){
        const {url} = this.props.match
        return(
            <ArticleList article_list={this.state.article_list} url={url}/>
        )
    }
}

export default ArticleListContainer