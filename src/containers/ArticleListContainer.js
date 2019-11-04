import React, {Component} from 'react';
// import ArticleList from '../component/ArticleList'
import ArticleList from '../component/ArticleListNew'
import axios from 'axios';
import Page from '../containers/PageContainer'
import {connect} from 'react-redux'
import SideUserInfo from './SideUserInfoContainer'

const mapStateToProps = (state, ownProps) => ({
	curPage: state.curPage
})

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
            return true
        };

        this.getData(username, this.props.curPage);
    }

    getData = (username, curPage = 1)=>{
        if (this.props && this.props.getData){
            this.props.getData(username, curPage = 1)
        }else{
            // axios.get(`/api/article_list?username=${username}`).then((response) => {
            axios.get(`/api/page/`, {params:{username, curPage}}).then((response) => {
                if (this._isMounted){
                    this.setState({username:username, article_list:response.data});
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    parseUsername(props){
        let {username} = props.match.params
        return username
    }

    componentWillReceiveProps(nextProps){
        let username = this.parseUsername(nextProps)
        if (this.state.username === username || !username || username==='undefined') return false;
        this.getData(username, this.props.curPage);
        return true
    }

    render(){
        const {username} = this.props.match.params
        return(
            <div>
                <SideUserInfo curUsername={username} />
                <ArticleList article_list={this.state.article_list} username = {username}/>
				<Page username = {username}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ArticleListContainer)