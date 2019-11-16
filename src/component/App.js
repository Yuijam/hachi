import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../containers/LoginContainer';
// import Home from './Home';
import Register from '../containers/RegisterContainer'
import JoinUs from './JoinUs';
import './css/App.css';
import { Redirect } from 'react-router-dom';
import TopBar from '../containers/TopBarContainer';
import Profile from '../containers/ProfileContainer'
import Message from './Message'
import {reqSession} from '../api'
// import Article from '../containers/ArticleContainer';
import {userInfoWrapper} from '../redux/Wrapper'
import ArticleList from '../containers/ArticleListContainer'
import WriteNew from '../containers/WriteNew';
import Article from '../containers/ArticleContainer';
import WriteEdit from '../containers/WriteEdit'
import Timeline from '../containers/TimelineContainer'

const PrivateRoute = ({ component: Component, validation, ...rest }) => {
	console.log('PrivateRoute', validation)
	return (
		<Route
			{...rest}
			render={props =>
				validation ? (
					<Component {...props} />
				) : (
						<Redirect
							to={{
								pathname: "/",
								redirData: { from: props.location }
							}}
						/>
					)
			}
		/>
	);
}
class App extends Component {

	// state = {redir:false}

	async componentDidMount() {
		let res = await reqSession()
		if (res.status===0){
			this.props.updateUserInfo(res.data)
		}
	}

	render() {
		const { location, userInfo } = this.props;
		console.log('app location.state = ', location)
		let pathname = location.pathname
		if (pathname && pathname !== '/' && pathname.charAt(pathname.length - 1) === '/') {
			return <Redirect to={pathname.slice(0, pathname.length - 1)} />
		}

		console.log('this.redir ', location)
		if (userInfo && userInfo.username && location.redirData && location.redirData.from){
			console.log('qqqqqqqqqqqqqq')
			return <Redirect to={location.redirData.from} />
		}

		return (
			<div className='app-body'>
				<TopBar />
				<Switch >
					<Route exact path='/' component={JoinUs} />
					<Route path='/user/:username/timeline' component={Timeline} />
					<Route path='/user/:username/profile' component={Profile} />
					<Route path='/user/:username/message' component={Message} />
					{/* <Route path={`/user/:username/article/:id`} component={Article} /> */}
					<Route path={`/user/:username/write`} component={WriteNew} />
					<Route path={`/user/:username/edit`} component={WriteEdit} />
					<Route path={`/user/:username/article/:id`} component={Article} />
					<PrivateRoute path='/user/:username' validation={this.props.userInfo.username} component={ArticleList} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</div>
		);
	}
}

export default userInfoWrapper(App);
