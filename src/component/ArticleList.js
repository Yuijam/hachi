import React, { Component } from 'react'
import ArticleItem from './ArticleItem'
import './css/ArticleList.css'
import axios from 'axios';

class ArticleList extends Component {

    state = {username:'', article_list:[]}

    constructor(props){
        super(props);
        this._isMounted = false;
    }


    componentWillUnmount() {
        this._isMounted = false;
     }

    componentDidMount(){
        this._isMounted = true;
        let username = this.parseUsername(this.props)
        // console.log('ArticleList componentDidMount', username, typeof(username))
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
                this.setState({article_list:response.data.article_list});
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
        console.log('articlelist render')
        let {url} = this.props.match
        return (
            <div className='artcleList'>       
                {this.state.article_list.map((itemData, i) => {
                    return (<ArticleItem className='articleItem' itemData={itemData} key={i} url={url}/>)
                })}
            </div>
        )
    }
}

export default ArticleList