import Login from '../component/Login'
import { connect } from 'react-redux'
import {updateUserInfo} from '../actions'

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)