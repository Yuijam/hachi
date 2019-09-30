import React, {Component} from 'react';
import Page from '../component/Page'
import {connect} from 'react-redux'
import {updatePage} from '../actions'
import axios from 'axios';

const mapStateToProps = (state, ownProps) => ({
    curPage: state.curPage
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updatePage: (curPage) => dispatch(updatePage(curPage))
})

class PageContainer extends Component{

    state = {total:1}

    onChange = (num)=>{
        console.log('num =', num)
        this.props.updatePage(num)
    }

    componentDidMount(){
        console.log('Page contain this.props.username =', this.props.username)
        if (this.props.username) {
            axios.get(`/api/articlesCount`, {params:{username:this.props.username}}).then((response) => {
                console.log('response.data = ', response.data)
                this.setState({total:response.data});
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render(){
        return(
            <Page total={this.state.total} onChange={this.onChange} curPage={this.props.curPage}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)