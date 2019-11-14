import { connect } from 'react-redux'
import {updateUserInfo} from '../redux/Actions'

export const userInfoWrapper = (WrappedComponent) => {
  return connect(state => ({userInfo: state.userInfo}), {updateUserInfo})(WrappedComponent)
}