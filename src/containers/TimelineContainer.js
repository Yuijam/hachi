import React, { Component } from 'react'
import ArticleListContainer from './ArticleListContainer'

class TimelineContainer extends Component{

    getData = (username, curPage = 1)=>{
        // axios.get(`/api/article_list?username=${username}`).then((response) => {
        axios.get(`/api/page/`, {params:{username, curPage}}).then((response) => {
            if (this._isMounted){
                this.setState({username:username, article_list:response.data});
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        return (
            <ArticleListContainer getData={this.getData}/>
        )
    }
}

export default TimelineContainer