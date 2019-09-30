import React, {Component} from 'react';
// import ArticleList from './ArticleList'
import ArticleList from '../containers/ArticleListContainer'
// import TopBar from '../containers/UserTopBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import WriteNew from '../containers/WriteNew';
import Article from '../containers/ArticleContainer';
import WriteEdit from '../containers/WriteEdit'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
	curPage: state.curPage
})

class Home extends Component {

	render(){
		let {username} = this.props.match.params
		let {url} = this.props.match
		console.log('Home username = ', username, url)
		if (!this.curPage) this.curPage = this.props.curPage
        if (this.curPage !== this.props.curPage) {
			this.curPage = this.props.curPage
			console.log('redirect to page')
            return <Redirect to={`${url}/page/${this.props.curPage}`}/>
        }

		return (
			<div className='app-body'>
				<Switch >
					<Route path={`${url}/write`} component={WriteNew} />
					<Route path={`${url}/edit`} component={WriteEdit} />
					<Route path={`${url}/article/:id`} component={Article} />
					<Route path={`/user/:username/page/:pageIdx`} component={ArticleList} username={this.username}/>
					<Route path={`/user/:username`} component={ArticleList} username={this.username}/>
				</Switch>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Home);
