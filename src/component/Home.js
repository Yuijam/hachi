import React, {Component} from 'react';
// import ArticleList from './ArticleList'
import ArticleList from '../containers/ArticleListContainer'
// import TopBar from '../containers/UserTopBar';
import { Route, Switch } from 'react-router-dom';
import WriteNew from '../containers/WriteNew';
import Article from '../containers/ArticleContainer';
import WriteEdit from '../containers/WriteEdit'

class Home extends Component {

	render(){
		let {username} = this.props.match.params
		let {url} = this.props.match
		console.log('Home username = ', username)
		return (
			<div className='app-body'>
				{/* <TopBar/> */}
				<Switch>
					<Route path={`${url}/write`} component={WriteNew} />
					<Route path={`${url}/edit`} component={WriteEdit} />
					<Route path={`${url}/article/:id`} component={Article} />
					<Route component={ArticleList} username={this.username}/>
				</Switch>
			</div>
		);
	}
}

export default Home;
