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
import {Redirect} from 'react-router-dom';
import TopBar from '../containers/TopBarContainer';
// import Article from '../containers/ArticleContainer';

const mapStateToProps = (state, ownProps) => ({
	userInfo: state.userInfo,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	setUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo)),
})


class App extends Component {

	componentDidMount() {
		axios.get('/session').then((response) => {
			if (response && response.data) {
				this.props.setUserInfo(response.data)
			}
		}).catch((error) => {
			console.log(error)
		})
	}

	render() {
		const { location } = this.props;
		// console.log('app location.state = ', location)
		let pathname = location.pathname
		if (pathname && pathname!== '/' && pathname.charAt(pathname.length-1) === '/'){
			return <Redirect to={pathname.slice(0, pathname.length-1)}/>
		}

		return (
			<div className='app-body'>
				<TopBar/>
				<Switch >
					<Route exact path='/' component={JoinUs} />
					{/* <Route path={`/user/:username/article/:id`} component={Article} /> */}
					<Route path='/user/:username' component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
