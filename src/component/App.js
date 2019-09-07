import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../containers/Login';
import Home from './Home';
import Register from './Register';
import JoinUs from './JoinUs';
import axios from 'axios';
import { connect } from 'react-redux'
import { updateUserInfo } from '../actions'
import './css/App.css';
import {Redirect} from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
	userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	setUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo))
})


class App extends Component {

	previousLocation = this.props.location;

	componentDidMount() {
		axios.get('/session').then((response) => {
			if (response && response.data) {
				this.props.setUserInfo(response.data)
			}
		}).catch((error) => {
			console.log(error)
		})
	}

	componentWillUpdate(nextProps) {
		let { location } = this.props;

		// set previousLocation if props.location is not modal
		if (
			nextProps.history.action !== "POP" &&
			(!location.state || !location.state.modal)
		) {
			this.previousLocation = this.props.location;
		}
	}

	render() {
		const { location } = this.props;
		let isLogin = !!(
			location.state &&
			location.state.isFloatPage &&
			this.previousLocation !== location
		); // not initial render
		// console.log('isLogin = ', isLogin)
		console.log('app location.state = ', location)
		let pathname = location.pathname
		if (pathname && pathname!== '/' && pathname.charAt(pathname.length-1) === '/'){
			return <Redirect to={pathname.slice(0, pathname.length-1)}/>
		}
		// console.log('this.previousLocation = ', this.previousLocation, location)
		return (
			<div className='app-body'>
				<Switch location={isLogin ? this.previousLocation : location}>
					<Route exact path='/' component={JoinUs} />
					<Route path='/user/:username' component={Home} />
				</Switch>
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
