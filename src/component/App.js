import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../containers/LoginContainer';
import Home from './Home';
import Register from '../containers/RegisterContainer'
import JoinUs from './JoinUs';
import axios from 'axios';
import { connect } from 'react-redux'
import { updateUserInfo } from '../actions'
import './css/App.css';
import { Redirect } from 'react-router-dom';
import TopBar from '../containers/TopBarContainer';
import Profile from '../containers/ProfileContainer'
import Message from './Message'
// import Article from '../containers/ArticleContainer';

const mapStateToProps = (state, ownProps) => ({
	userInfo: state.userInfo,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	setUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo)),
})

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

	componentDidMount() {
		axios.get('/session').then((response) => {
			if (response && response.data) {
				console.log('11111111111 set user info')
				this.props.setUserInfo(response.data)
				// this.setState({redir:true})
			}
		}).catch((error) => {
			console.log(error)
		})
	}


	render() {
		const { location, userInfo } = this.props;
		console.log('app location.state = ', location)
		let pathname = location.pathname
		if (pathname && pathname !== '/' && pathname.charAt(pathname.length - 1) === '/') {
			return <Redirect to={pathname.slice(0, pathname.length - 1)} />
		}

		// if (!this.props.userInfo.username) {
		// 	return <Redirect to={pathname.slice(0, pathname.length-1)}/>
		// }
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
					<Route path='/user/:username/timeline' component={Home} />
					<Route path='/user/:username/profile' component={Profile} />
					<Route path='/user/:username/message' component={Message} />
					{/* <Route path={`/user/:username/article/:id`} component={Article} /> */}
					<PrivateRoute path='/user/:username' validation={this.props.userInfo.username} component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
