import React, {Component} from 'react';
import ArticleList from '../component/ArticleList'
import {connect} from 'react-redux'
import SideUserInfo from './SideUserInfoContainer'
import {reqArticles} from '../api'
import {PAGE_SIZE} from '../const'

const mapStateToProps = (state, ownProps) => ({
	curPage: state.curPage
})

class ArticleListContainer extends Component{

    state = {username:'', articles:[], total:0}

    componentDidMount(){
        const {username} = this.props.match.params
        this.getData(username);
    }

    getData = async (username, pageIdx = 1)=>{
        if (this.props && this.props.getData){
            this.props.getData(username, pageIdx = 1)
        }else{
            let res = await reqArticles(username, pageIdx, PAGE_SIZE)
            this.setState({username:username, articles:res.data.articles, total:res.data.total});
        }
    }

    onPageChange = (pageIdx) => {
        console.log('onPageChange ', pageIdx)
        const {username} = this.props.match.params
        this.getData(username, pageIdx)
    }

    render(){
        const {username} = this.props.match.params
        return(
            <div>
                <SideUserInfo curUsername={username} />
                <ArticleList 
                    articles={this.state.articles} 
                    onPageChange={this.onPageChange}  
                    pageSize={PAGE_SIZE} 
                    total={this.state.total}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps)(ArticleListContainer)