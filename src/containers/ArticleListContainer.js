import React, {Component} from 'react';
import ArticleList from './ArticleListContainer'
import axios from 'axios';

class ArticleListContainer extends Component{

    state = {username:'', articleList:[]}

    fetchArticleListData(username){
        if (!username) return
        
        this.setState({username:username})
        axios.get(`/api/article_list?username=${username}`).then((response) => {
            console.log(response.data);
            this.setState({articleList:response.data.article_list});
        }).catch((error) => {
            console.log(error);
        });
    }

    componentWillMount(){
        let {username} = this.props
        if (!username) return
        
        this.setState({username:username})
        axios.get(`/api/article_list?username=${username}`).then((response) => {
            console.log(response.data);
            this.setState({articleList:response.data.article_list});
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        // let {username} = this.props;
        // let data = this.fetchArticleListData(username);
        return(
            <ArticleList articleList={this.state.articleList}/>
        )
    }
}

export default ArticleListContainer