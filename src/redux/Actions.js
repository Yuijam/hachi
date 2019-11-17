import {
  UPDATE_USER_INFO,
} from './ActionTypes'
import { reqLogin } from '../api'
import { message } from 'antd'

export const updateUserInfo = userInfo => {
  console.log('!!!!!!!!!UPdat', userInfo, console.trace())
  return {
    type: UPDATE_USER_INFO,
    userInfo
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const result = await reqLogin(username, password)
    console.log('login', result)
    if (result.status === 0) {
      const user = result.data
      // storageUtils.saveUser(user)

      dispatch(updateUserInfo(user))
    } else {
      console.log('login error')
      const msg = result.msg
      message.error(msg)
      // dispatch(showErrorMsg(msg))
    }

  }
}